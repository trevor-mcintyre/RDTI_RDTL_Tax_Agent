import React from 'react';
import { snapshotClaimVersion } from '../utils/versionUtils';

export default function SaveVersionButton({ companyId, userId }) {
  const handleSave = async () => {
    try {
      await snapshotClaimVersion(companyId, userId);
      alert('✅ Snapshot saved to version history!');
    } catch (err) {
      console.error('Version save failed:', err);
      alert('❌ Failed to save version. Check console for details.');
    }
  };

  return (
    <button
      onClick={handleSave}
      className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 mt-4"
    >
      🕒 Save Claim Version Snapshot
    </button>
  );
}