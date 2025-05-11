
// utils/logActivity.js
const supabase = require('./supabase');

async function logActivity({ user, action, targetId, metadata = {} }) {
  try {
    await supabase.from('activity_logs').insert({
      user: user.name,
      role: user.role,
      action,
      target_id: targetId,
      metadata
    });
  } catch (err) {
    console.error('Supabase logActivity error:', err);
  }
}

module.exports = { logActivity };
