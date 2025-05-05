import React
import MotivationBanner from '../components/MotivationBanner'; from 'react';
import { generateClaimExportZip } from '../utils/exportUtils';

export default function ExportClaimButton({ companyId }) {
  const handleExport = async () => {
    try {
      await generateClaimExportZip(companyId);
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