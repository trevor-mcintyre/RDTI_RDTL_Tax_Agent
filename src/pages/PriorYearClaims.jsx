import React, { useEffect, useState } from 'react';
import { getPriorYearClaims } from '../services/priorYearService';

const PriorYearClaims = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    getPriorYearClaims().then(setClaims);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">📁 Prior Year R&D Claims</h1>
      <p className="text-sm text-gray-600 mb-6">Review summaries of your past RDTI/RDTL claims by year.</p>
      <div className="space-y-4">
        {claims.map((claim) => (
          <div key={claim.id} className="p-4 bg-white rounded shadow border">
            <h2 className="font-semibold text-lg text-gray-700">📅 {claim.fiscal_year}</h2>
            <p className="text-sm text-gray-600 mt-1"><strong>Core Activities:</strong> {claim.core_activities}</p>
            <p className="text-sm text-gray-600 mt-1"><strong>Supporting Activities:</strong> {claim.supporting_activities}</p>
            <p className="text-sm text-gray-600 mt-1"><strong>Summary:</strong> {claim.claim_summary}</p>
            <p className="text-sm text-gray-600 mt-1">💰 RDTI Credit: ${claim.rdti_credit} | 💸 RDTL Amount: ${claim.rdtl_amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriorYearClaims;