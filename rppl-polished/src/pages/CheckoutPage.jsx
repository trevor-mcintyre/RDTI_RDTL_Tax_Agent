import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ExclusionChecklist from "../components/ExclusionChecklist";
import GlossaryTooltip from "../components/GlossaryTooltip";
import Confetti from "../components/Confetti";
import Card from "../components/Card";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [showCelebration, setShowCelebration] = useState(false);

  const handleAccessClick = () => {
    setShowCelebration(true);
    toast.success("You’re in! Let’s get started.");
    navigate("/dashboard");
  };

  const handleChecklistUpload = (files, tag) => {
    console.log("Checklist evidence uploaded:", files, tag);
    // Future: store or validate uploaded files
  };

  return (
    <div className="space-y-8">
      {showCelebration && <Confetti />}

      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">🎯 Join the RDTI & RDTL Beta</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          To complete your submission, confirm eligibility and upload the exclusion checklist. Once done, you’ll get access!
        </p>
      </header>

      <Card title="Exclusion Checklist">
        <ExclusionChecklist onUpload={handleChecklistUpload} />
        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <GlossaryTooltip message="We use this checklist to ensure you meet IRD criteria." />
          Required for beta access.
        </p>
      </Card>

      <div className="text-center">
        <button
          onClick={handleAccessClick}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          🎉 Complete & Join Beta
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;