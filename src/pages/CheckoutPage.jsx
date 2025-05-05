
import ExclusionChecklist from '../components/ExclusionChecklist';
import Tooltip from '../components/Tooltip';
import Confetti from '../components/Confetti';
import { useState } from 'react';

import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();

  const handleAccessClick = () => {
    // Simulate successful Stripe checkout
    alert("Success! You've secured your beta access.");
    navigate('/dashboard');
  };

  return (
    
      {showCelebration && <Confetti />}
      <div className="p-4 my-6 border rounded bg-white shadow">
        <h2 className="text-xl font-bold mb-2">🧹 Exclusion Clean-up</h2>
        <p className="mb-4 text-gray-700">
          Let’s make sure your claim is squeaky clean! Tick anything below that applies so we can sort it out for you.
        </p>
        <ExclusionChecklist onUpload={handleChecklistUpload} />
      </div>
    
<div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white">
      <h1 className="text-3xl font-bold text-center mb-4">Join the RDTI & RDTL Beta</h1>
      <p className="text-center max-w-xl text-gray-600 mb-6">
        Secure your early access to the R&D Tax Credit Companion App for New Zealand startups.
        100% free during beta. No card required.
      </p>
      <button
        onClick={handleAccessClick}
        className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
      >
        Claim Your Free Beta Pass
      </button>
      <p className="mt-4 text-xs text-gray-400">
        This confirms your spot in the beta. You’ll receive instant access after checkout.
      </p>
    </div>
  );
};

export default CheckoutPage;