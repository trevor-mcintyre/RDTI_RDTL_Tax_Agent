import React from 'react';

const MotivationBanner = ({ message = "Almost there — you're doing great!" }) => (
  <div className="bg-blue-50 text-blue-800 text-sm px-4 py-2 rounded mb-4 border border-blue-200 shadow-sm">
    {message}
  </div>
);

export default MotivationBanner;