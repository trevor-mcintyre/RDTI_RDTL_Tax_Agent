import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSigningUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          {isSigningUp ? "Create an account" : "Welcome back"}
        </h2>
        <p className="text-gray-500 mb-6">
          {isSigningUp ? "Sign up to get started" : "Login to continue"}
        </p>

        {error && <div className="text-sm text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isSigningUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="my-4 text-center text-sm text-gray-500">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border py-2 rounded-md hover:bg-gray-100 transition"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-sm text-center text-gray-500">
          {isSigningUp ? "Already have an account?" : "Need an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSigningUp(!isSigningUp)}
            className="text-blue-600 hover:underline"
          >
            {isSigningUp ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}