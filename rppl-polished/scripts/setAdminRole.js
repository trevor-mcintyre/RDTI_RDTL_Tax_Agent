
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
// admin.auth().getUserByEmail(email).then(user => user.uid).then(assignRole);

function assignRole(targetUid) {
  admin.auth().setCustomUserClaims(targetUid, { role: 'admin' })
    .then(() => {
      console.log(`✅ Successfully assigned 'admin' role to UID: ${targetUid}`);
    })
    .catch((error) => {
      console.error('❌ Error assigning admin role:', error);
    });
}

assignRole(uid);
