import React from 'react';
import { generateClaimExportZip } from '../utils/exportUtils';

export default function ExportClaimButton({ companyId }) {
  const handleExport = async () => {
    try {
      const blob = await generateClaimExportZip(companyId);

      if (!blob) throw new Error("No ZIP returned");

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `rdti-claim-${companyId}.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      alert('✅ Export complete! ZIP file downloaded.');
    } catch (err) {
      console.error('Export failed:', err);
      alert('❌ Export failed. See console for details.');
    }
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 mt-4"
    >
      📦 Export RDTI Claim (ZIP)
    </button>
  );
}