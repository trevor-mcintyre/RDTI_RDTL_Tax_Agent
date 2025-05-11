import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const sendUserToBackend = async (user) => {
    try {
      const token = await user.getIdToken();
      await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName || 'Unnamed User',
        }),
      });
    } catch (err) {
      console.error('Backend sync failed:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const method = mode === 'login' ? signInWithEmailAndPassword : createUserWithEmailAndPassword;
      const userCredential = await method(auth, email, password);
      await sendUserToBackend(userCredential.user);
      setSuccess('Authentication successful! Redirecting...');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setSuccess('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await sendUserToBackend(result.user);
      setSuccess('Signed in with Google!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError('Google sign-in failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4">
          {mode === 'login' ? 'Log In' : 'Sign Up'}
        </h2>

        {error && <ErrorMessage message={error} />}
        {success && <SuccessMessage message={success} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full mt-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Continue with Google
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-blue-600 hover:underline"
          >
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
}
