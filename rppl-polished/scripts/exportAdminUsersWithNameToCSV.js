
const admin = require('firebase-admin');
const fs = require('fs');
const { Parser } = require('json2csv');

// Replace with path to your Firebase Admin SDK key file
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function listAdminsToCSV(nextPageToken, allAdmins = []) {
  const result = await admin.auth().listUsers(1000, nextPageToken);
  const admins = result.users.filter(user => user.customClaims && user.customClaims.role === 'admin');

  allAdmins.push(...admins.map(adminUser => ({
    uid: adminUser.uid,
    email: adminUser.email,
    role: adminUser.customClaims.role,
    displayName: adminUser.displayName || '',
    createdAt: new Date(adminUser.metadata.creationTime).toISOString(),
    lastSignIn: new Date(adminUser.metadata.lastSignInTime).toISOString()
  })));

  if (result.pageToken) {
    return listAdminsToCSV(result.pageToken, allAdmins);
  } else {
    const parser = new Parser({ fields: ['uid', 'email', 'role', 'displayName', 'createdAt', 'lastSignIn'] });
    const csv = parser.parse(allAdmins);
    fs.writeFileSync('admin_users_with_metadata_and_name.csv', csv);
    console.log('✅ Exported admin users with display names to admin_users_with_metadata_and_name.csv');
  }
}

listAdminsToCSV().catch(error => {
  console.error('❌ Error exporting admin users:', error);
});
