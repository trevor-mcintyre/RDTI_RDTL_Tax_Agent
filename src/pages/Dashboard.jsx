import ExclusionChecklist from '../components/ExclusionChecklist';
import React from 'react';
import ProgressBar from '../components/ProgressBar';
import MotivationBanner from '../components/MotivationBanner';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const claimProgress = 65; // placeholder percentage
  const daysToDeadline = 42; // placeholder days

  return (
    
      <ExclusionChecklist onUpload={(files, tag) => {
        console.log("Exclusion files uploaded:", files, tag);
        // Future: handle exclusion file storage
      }} />
    
<div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">📊 R&D Tax Claim Dashboard</h1>
      <MotivationBanner message="You're making great progress — keep it up!" />

      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Overall Claim Progress</h2>
        <ProgressBar percentage={claimProgress} />
        <p className="text-sm text-gray-600 mt-1">{claimProgress}% complete</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded shadow">
          <h3 className="font-medium text-blue-800">🗓️ Next Deadline</h3>
          <p className="text-sm text-gray-700">General Approval due in <strong>{daysToDeadline} days</strong></p>
        </div>
        <div className="bg-yellow-50 p-4 rounded shadow">
          <h3 className="font-medium text-yellow-800">🚩 Flagged Risk Items</h3>
          <p className="text-sm text-gray-700">3 sections need review before submission</p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded shadow">
        <h3 className="text-md font-semibold mb-2">🔗 Quick Access</h3>
        <ul className="list-disc ml-5 text-sm text-blue-700 space-y-1">
          <li><Link to="/claim/general-approval" className="hover:underline">General Approval</Link></li>
          <li><Link to="/claim/supplementary-return" className="hover:underline">Supplementary Return</Link></li>
          <li><Link to="/claim/evidence" className="hover:underline">Evidence Upload</Link></li>
          <li><Link to="/claim/overview" className="hover:underline">Claim Summary</Link></li>
          <li><Link to="/claim/history" className="hover:underline">Prior Year Claims</Link></li>
</ul>
      </div>
    </div>
  );
};

export default Dashboard;