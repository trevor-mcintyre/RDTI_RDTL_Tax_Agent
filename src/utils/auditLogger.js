
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../firebase";

const db = getFirestore();

export async function logAuditEvent(eventType, details = {}) {
  const user = auth.currentUser;
  if (!user) return;

  try {
    await addDoc(collection(db, "auditLogs"), {
      uid: user.uid,
      email: user.email,
      eventType,
      details,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Audit log failed:", error);
  }
}
