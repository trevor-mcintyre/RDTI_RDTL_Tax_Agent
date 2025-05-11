import React from 'react';

export default function RDTLEstimatePanel({ estimatedReturn = 0 }) {
  return (
    <div className="mt-6 p-4 rounded-lg bg-yellow-50 border border-yellow-300 text-yellow-800">
      <strong>💰 Estimated Return:</strong>{' '}
      Your claim could generate a refund of{' '}
      <strong>${Number(estimatedReturn).toLocaleString()}</strong>.
    </div>
  );
}
