import React from 'react';
import { generateGLCompatibleExport } from '../utils/glExport';

export default function GLExportButton({ companyId }) {
  const handleExport = async () => {
    try {
      await generateGLCompatibleExport(companyId);
      alert('✅ GL export complete! ZIP downloaded.');
    } catch (err) {
      console.error('Export failed:', err);
      alert('❌ Export failed. See console for details.');
    }
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 mt-4"
    >
      🧾 Export for Xero (GL CSV)
    </button>
  );
}