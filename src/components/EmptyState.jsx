
import React from "react";

export default function EmptyState({ message = "Nothing here yet!" }) {
  return (
    <div className="text-center py-10 text-gray-500">
      <img
        src="/empty-state.png"
        alt="Empty state illustration"
        className="w-32 mx-auto mb-4 opacity-70"
        aria-hidden="true"
      />
      <p className="text-lg" role="status">
        {message}
      </p>
    </div>
  );
}
