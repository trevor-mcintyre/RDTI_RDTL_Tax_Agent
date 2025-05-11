import React, { useState } from "react";
import { useEvidence } from "../context/EvidenceContext";
import GlossaryTooltip from "./GlossaryTooltip";
import { toast } from "react-hot-toast";

const exclusionItems = [
  "We received a Callaghan R&D Project Grant",
  "We included marketing/sales costs",
  "We are claiming depreciation on ineligible assets",
  "We are including non-R&D support staff costs (e.g. admin, HR)",
];

const tooltipMap = {
  "We received a Callaghan R&D Project Grant":
    "If you’ve received this grant, certain expenditures must be excluded from your RDTI claim.",
  "We included marketing/sales costs":
    "Marketing and sales activities are not eligible for RDTI claims.",
  "We are claiming depreciation on ineligible assets":
    "Only eligible R&D-related assets can be depreciated under the scheme.",
  "We are including non-R&D support staff costs (e.g. admin, HR)":
    "Non-R&D staff costs must be excluded from your claim.",
};

export default function ExclusionChecklist() {
  const { addEvidence } = useEvidence();
  const [checkedItems, setCheckedItems] = useState([]);
  const [saved, setSaved] = useState(false);
  const [previousState, setPreviousState] = useState([]);

  const totalItems = exclusionItems.length;
  const passedItems = totalItems - checkedItems.length;
  const complianceScore = Math.round((passedItems / totalItems) * 100);

  const handleCheckboxChange = (item) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleConfirm = () => {
    const prev = [...checkedItems];
    setPreviousState(prev);

    toast(
      (t) => (
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm">✅ Checklist confirmed</span>
          <button
            onClick={() => {
              setCheckedItems(prev);
              toast.dismiss(t.id);
              toast.success("Undo complete. Checklist reverted.");
            }}
            className="text-blue-600 text-sm hover:underline"
          >
            Undo
          </button>
        </div>
      ),
      { duration: 7000 }
    );

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-700">
        Please confirm any exclusions that apply to your claim:
      </p>

      <ul className="space-y-3">
        {exclusionItems.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={checkedItems.includes(item)}
              onChange={() => handleCheckboxChange(item)}
              className="mt-1"
            />
            <div className="flex-1 text-sm text-gray-800">
              {item} <GlossaryTooltip message={tooltipMap[item]} />
            </div>
          </li>
        ))}
      </ul>

      <div className="text-sm text-gray-600">
        Compliance Score:{" "}
        <span className="font-semibold">{complianceScore}%</span>
      </div>

      <button
        onClick={handleConfirm}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Confirm Checklist
      </button>

      {saved && (
        <p className="text-green-600 text-sm mt-2">Saved ✔</p>
      )}
    </div>
  );
}
