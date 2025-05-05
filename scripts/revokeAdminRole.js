
const admin = require('firebase-admin');

// Replace this with the path to your Firebase Admin SDK JSON key file
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Replace this with the user's UID or use getUserByEmail below
const uid = 'REPLACE_WITH_UID';

// Optionally use email instead of UID
// const email = 'user@example.com';
// admin.auth().getUserByEmail(email).then(user => user.uid).then(revokeRole);

function revokeRole(targetUid) {
  admin.auth().setCustomUserClaims(targetUid, {})
    .then(() => {
      console.log(`✅ Successfully removed custom claims for UID: ${targetUid}`);
    })
    .catch((error) => {
      console.error('❌ Error removing admin role:', error);
    });
}

revokeRole(uid);
