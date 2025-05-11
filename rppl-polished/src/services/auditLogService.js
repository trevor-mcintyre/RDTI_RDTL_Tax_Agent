
// Logs user actions to Firestore or other logging service
export const logAuditAction = async (userId, actionType, metadata = {}) => {
  const timestamp = new Date().toISOString();
  console.log(`[AUDIT] ${timestamp} | ${userId} | ${actionType} |`, metadata);
  // TODO: Save to Firestore or Supabase logs collection
};
