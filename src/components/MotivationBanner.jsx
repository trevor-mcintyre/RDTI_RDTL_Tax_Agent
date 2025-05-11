import React from "react";

export default function MotivationBanner({
  message = "Every step brings your R&D claim closer to done. Keep it up!",
}) {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm space-y-1">
      <h3 className="text-yellow-800 font-semibold">You're doing great! 🎉</h3>
      <p className="text-yellow-700 text-sm">{message}</p>
    </div>
  );
}