import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { CompanyContext } from '../../context/CompanyContext';
import { useRoleAccess } from '../../hooks/useRoleAccess';
import ExportService from '../../services/exportService';
import auditLogger, { AuditAction } from '../../services/auditLogger';

const ExportManager = () => {
  const [isExporting, setIsExporting] = useState(false);
  const { company } = useContext(CompanyContext);
  const { canExport } = useRoleAccess();

  if (!canExport) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">You don't have permission to export data.</p>
      </div>
    );
  }

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const exportService = new ExportService(company.id);
      const result = await exportService.generateCompletePackage();

      if (result.success) {
        toast.success('Export completed successfully!');
        await auditLogger.log(AuditAction.DATA_EXPORTED);
      } else {
        toast.error(`Export failed: ${result.error}`);
      }
    } catch (error) {
      toast.error(`Export error: ${error.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Export Submission Package</h2>
      
      <div className="p-4 bg-gray-50 rounded-lg mb-6">
        <h4 className="font-medium text-gray-900 mb-2">Package Contents</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Claims data (CSV format)</li>
          <li>• Structured data (JSON)</li>
          <li>• Human-readable summary</li>
          <li>• Export metadata</li>
        </ul>
      </div>

      <button
        onClick={handleExport}
        disabled={isExporting}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isExporting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isExporting ? 'Generating Export...' : 'Generate Export Package'}
      </button>
    </div>
  );
};

export default ExportManager;