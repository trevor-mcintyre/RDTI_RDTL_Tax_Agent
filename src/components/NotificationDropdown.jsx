import React from "react";

export default function NotificationDropdown({ children, onClose }) {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg p-4 z-50">
      {children || (
        <p className="text-sm text-gray-700">No new notifications</p>
      )}
    </div>
  );
}