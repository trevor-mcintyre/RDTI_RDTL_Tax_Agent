
const admin = require('firebase-admin');

// Replace with path to your Firebase Admin SDK key file
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function listAdmins(nextPageToken) {
  const result = await admin.auth().listUsers(1000, nextPageToken);
  const admins = result.users.filter(user => user.customClaims && user.customClaims.role === 'admin');

  admins.forEach(adminUser => {
    console.log(`👤 UID: ${adminUser.uid}`);
    console.log(`📧 Email: ${adminUser.email}`);
    console.log(`🔐 Role: ${adminUser.customClaims.role}`);
    console.log('---');
  });

  if (result.pageToken) {
    await listAdmins(result.pageToken);
  }
}

listAdmins().catch(error => {
  console.error('❌ Error listing admin users:', error);
});
