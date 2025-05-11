
import React from "react";

const FeedbackWidget = () => {
  return (
    <div style={{ position: "fixed", bottom: "1rem", right: "1rem", zIndex: 1000 }}>
      <a
        href="https://forms.gle/example-feedback-form"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: "#0070f3",
          color: "#fff",
          padding: "10px 16px",
          borderRadius: "24px",
          textDecoration: "none",
          fontWeight: "bold"
        }}
      >
        💬 Feedback
      </a>
    </div>
  );
};

export default FeedbackWidget;
