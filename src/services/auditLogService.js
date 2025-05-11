// services/auditLogService.js
import { supabase } from './supabaseClient';

/**
 * Log a user action for auditing purposes.
 *
 * @param {string} userId - The ID of the user performing the action
 * @param {string} actionType - A string describing the action (e.g. "VIEWED_CLAIM")
 * @param {object} metadata - Optional extra details about the action context
 */
export const logAuditAction = async (userId, actionType, metadata = {}) => {
  const timestamp = new Date().toISOString();

  if (!userId || !actionType) {
    console.warn("[AUDIT] Missing required audit log fields.");
    return;
  }

  // ✅ Console log for visibility
  console.log(`[AUDIT] ${timestamp} | ${userId} | ${actionType}`, metadata);

  // ✅ Persist to Supabase audit_logs table
  const { error } = await supabase.from('audit_logs').insert([
    {
      user_id: userId,
      action: actionType,
      metadata,
      timestamp
    }
  ]);

  if (error) {
    console.error("❌ Failed to persist audit log to Supabase:", error);
  }
};
