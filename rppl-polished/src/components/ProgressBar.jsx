import React from "react";

const ProgressBar = ({ percentage }) => {
  return (
    <div className="w-full bg-blue-100 rounded-lg h-6 overflow-hidden">
      <div
        className="bg-blue-600 text-white text-sm font-medium h-full text-center transition-all duration-500"
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressBar;