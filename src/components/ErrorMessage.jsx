import React from "react";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="bg-red-50 border border-red-300 text-red-700 px-4 py-2 rounded text-sm shadow-sm"
      role="alert"
      aria-live="assertive"
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
