import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Forgot Password</h2>
      <input
        className="border p-2 mb-2 w-full"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleReset} className="bg-blue-500 text-white px-4 py-2 rounded">
        Send Reset Link
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
