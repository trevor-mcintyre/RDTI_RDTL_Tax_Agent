import React from 'react';
import Lottie from 'lottie-react';
import confettiAnimation from '../animations/confetti.json';

export default function ProgressCelebration({ visible }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="w-64 h-64">
        <Lottie animationData={confettiAnimation} loop={false} />
      </div>
    </div>
  );
}