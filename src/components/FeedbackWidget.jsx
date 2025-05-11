import React from "react";

export default function FeedbackWidget() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="https://forms.gle/example-feedback-form"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition font-semibold text-sm"
        aria-label="Submit feedback"
      >
        💬 Feedback
      </a>
    </div>
  );
}
