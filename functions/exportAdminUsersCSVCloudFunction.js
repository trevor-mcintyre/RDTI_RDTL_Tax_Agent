
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Parser } = require('json2csv');

admin.initializeApp();

exports.exportAdminUsersCSV = functions.https.onRequest(async (req, res) => {
  try {
    const authToken = req.headers.authorization?.split('Bearer ')[1];
    if (!authToken) return res.status(401).send('Unauthorized: No token');

    const decodedToken = await admin.auth().verifyIdToken(authToken);
    if (decodedToken.role !== 'admin') {
      return res.status(403).send('Forbidden: Admin access required');
    }

    let allAdmins = [];
    let nextPageToken;
    do {
      const result = await admin.auth().listUsers(1000, nextPageToken);
      const admins = result.users.filter(user => user.customClaims && user.customClaims.role === 'admin');

      allAdmins.push(...admins.map(user => ({
        uid: user.uid,
        email: user.email,
        role: user.customClaims.role,
        displayName: user.displayName || '',
        createdAt: new Date(user.metadata.creationTime).toISOString(),
        lastSignIn: new Date(user.metadata.lastSignInTime).toISOString()
      })));

      nextPageToken = result.pageToken;
    } while (nextPageToken);

    const parser = new Parser({ fields: ['uid', 'email', 'role', 'displayName', 'createdAt', 'lastSignIn'] });
    const csv = parser.parse(allAdmins);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="admin_users.csv"');
    res.status(200).send(csv);
  } catch (error) {
    console.error('❌ CSV Export Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
