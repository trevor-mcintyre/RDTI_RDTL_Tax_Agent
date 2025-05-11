import React from "react";

const SuccessMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="bg-green-50 border border-green-300 text-green-700 px-4 py-2 rounded text-sm shadow-sm"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
};

export default SuccessMessage;
