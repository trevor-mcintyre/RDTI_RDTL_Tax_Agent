import React, { useState } from "react";
import NotificationDropdown from "./NotificationDropdown";

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        🔔
      </button>
      {open && (
        <NotificationDropdown onClose={() => setOpen(false)}>
          <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
          <p className="text-sm text-gray-600">You don’t have any notifications yet.</p>
        </NotificationDropdown>
      )}
    </div>
  );
}