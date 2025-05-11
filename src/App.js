import React from "react";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Routes>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<div>Welcome to Rppl Tax Agent</div>} />
    </Routes>
  );
}

export default App;
