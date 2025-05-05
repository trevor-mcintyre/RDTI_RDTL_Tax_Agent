import React from 'react';
import { generateTaggedExport } from '../utils/taggedExport';

export default function TaggedExportButton({ companyId }) {
  const handleExport = async () => {
    try {
      await generateTaggedExport(companyId);
      alert('✅ Tagged evidence export complete! ZIP downloaded.');
    } catch (err) {
      console.error('Tagged export failed:', err);
      alert('❌ Tagged export failed. See console for details.');
    }
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 mt-4"
    >
      📎 Export with IR1240 Tags & Evidence Links
    </button>
  );
}