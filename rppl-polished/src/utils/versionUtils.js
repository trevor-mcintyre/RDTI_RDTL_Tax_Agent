import { getFirestore, collection, getDocs, doc, addDoc } from 'firebase/firestore';

export async function snapshotClaimVersion(companyId, userId) {
  const db = getFirestore();
  const snapshot = await getDocs(collection(db, `companies/${companyId}/activities`));
  const versionData = [];

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    versionData.push({
      activityId: docSnap.id,
      ...data
    });
  });

  await addDoc(collection(db, `companies/${companyId}/versions`), {
    createdAt: new Date().toISOString(),
    userId: userId || 'system',
    data: versionData
  });

  return true;
}