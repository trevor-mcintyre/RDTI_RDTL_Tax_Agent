
import React from 'react';

export default function OnboardingChecklist() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Getting Started</h2>
      <ul className="list-disc list-inside text-sm text-gray-700">
        <li>✅ Complete your profile</li>
        <li>✅ Upload your first evidence</li>
        <li>✅ Invite a teammate</li>
        <li>⏳ Submit your first claim</li>
      </ul>
    </div>
  );
}
