import { collection, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { getAuth } from 'firebase/auth';

export const AuditAction = {
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  CLAIM_CREATED: 'claim_created',
  CLAIM_UPDATED: 'claim_updated',
  CLAIM_DELETED: 'claim_deleted',
  GITHUB_CONNECTED: 'github_connected',
  DATA_EXPORTED: 'data_exported',
};

class AuditLogger {
  async log(action, metadata = {}) {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      const logEntry = {
        action,
        userId: user?.uid || 'system',
        userEmail: user?.email || 'system',
        timestamp: new Date(),
        metadata
      };

      await addDoc(collection(db, 'audit_logs'), logEntry);
    } catch (error) {
      console.error('Failed to create audit log:', error);
    }
  }
}

export default new AuditLogger();