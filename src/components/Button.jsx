import React from "react";

export default function Button({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded font-medium transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700 active:scale-95 disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}