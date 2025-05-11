import React from "react";

const Card = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl shadow p-6 space-y-3 ${className}`}>
      {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;