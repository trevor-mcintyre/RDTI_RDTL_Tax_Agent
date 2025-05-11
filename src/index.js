import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Ensure this path is correct
import "./index.css"; // Include if styles are defined

// Ensure root element exists before rendering
const container = document.getElementById("root");

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("⚠️ Root element not found. Make sure your HTML has <div id='root'></div>");
}