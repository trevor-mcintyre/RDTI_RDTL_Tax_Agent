import React from "react";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex justify-center items-center py-12 text-gray-500">
      <svg
        className="animate-spin h-5 w-5 mr-3 text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      {message}
    </div>
  );
};

export default Loading;