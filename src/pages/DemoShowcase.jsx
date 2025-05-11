import React, { useState, useEffect } from "react";
import FriendlyProgressMeter from "../components/FriendlyProgressMeter";
import RDTLEstimatePanel from "../components/RDTLEstimatePanel";
import ProgressCelebration from "../components/ProgressCelebration";

export default function DemoShowcase() {
  const [progress, setProgress] = useState(0);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          setCelebrate(true);
          return 100;
        }
        return next;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-12 p-4 bg-gray-50 rounded shadow">
      <h1 className="text-xl font-bold mb-4 text-center">🎉 RDTI UI Demo</h1>
      <FriendlyProgressMeter percentage={progress} />
      <RDTLEstimatePanel estimatedReturn={42350} />
      {celebrate && <ProgressCelebration visible />}
    </div>
  );
}
