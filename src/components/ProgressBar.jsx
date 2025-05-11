import React from "react";

const ProgressBar = ({ percentage = 0 }) => {
  const safePercentage = Math.min(Math.max(percentage, 0), 100); // Clamp between 0 and 100

  return (
    <div
      className="w-full bg-blue-100 rounded-lg h-6 overflow-hidden"
      role="progressbar"
      aria-valuenow={safePercentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="bg-blue-600 text-white text-sm font-medium h-full text-center transition-all duration-500 flex items-center justify-center"
        style={{ width: `${safePercentage}%` }}
      >
        {safePercentage}%
      </div>
    </div>
  );
};

export default ProgressBar;