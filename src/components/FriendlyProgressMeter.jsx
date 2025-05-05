import React from 'react';

export default function FriendlyProgressMeter({ percentage }) {
  const message =
    percentage === 100
      ? "🎉 All done! Your R&D claim is ready to go."
      : percentage > 75
      ? "You're smashing it! 🧠"
      : percentage > 50
      ? "Halfway there! 🎯"
      : percentage > 25
      ? "Great start — keep going!"
      : "Let's get this claim moving!";

  return (
    <div className="p-4 mb-6 rounded-lg bg-white shadow text-center">
      <h2 className="text-lg font-semibold mb-2">Claim Progress</h2>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div className="bg-green-500 h-3 rounded-full" style={{ width: `${percentage}%` }} />
      </div>
      <p>{message}</p>
    </div>
  );
}