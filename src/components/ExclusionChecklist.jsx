
import React, { useState } from 'react';
import Tooltip from './Tooltip';
import { useEvidence } from '../context/EvidenceContext';

const exclusionItems = [
  "We received a Callaghan R&D Project Grant",
  "We included marketing/sales costs",
  "We are claiming depreciation on ineligible assets",
  "We are including non-R&D support staff costs (e.g. admin, HR)",
];

export default function ExclusionChecklist() {
  const { addEvidence } = useEvidence();
  const [checkedItems, setCheckedItems] = useState([]);
  
  const totalItems = exclusionItems.length;
  const passedItems = totalItems - checkedItems.length;
  const complianceScore = Math.round((passedItems / totalItems) * 100);

const tooltipMap = {'We received a Callaghan R&D Project Grant': 'If you’ve received this grant, certain expenditures must be excluded from your RDTI claim.', 'We included marketing/sales costs': 'Marketing and sales activities are not eligible for RDTI and must be excluded.', 'We are claiming depreciation on ineligible assets': 'Only assets directly used in R&D are eligible for depreciation claims.', 'We are including non-R&D support staff costs (e.g. admin, HR)': 'Admin, HR, and other support staff typically fall outside RDTI eligibility.'};
const [files, setFiles] = useState([]);

  const handleCheck = (item) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    console.log('Uploading exclusions:', selectedFiles);
    addEvidence(selectedFiles, 'exclusion');
  };

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-2">Check for Excluded Items</h2>
      <p className="text-sm text-gray-600 mb-4">
        To ensure accurate claims, please confirm whether any of the following apply.
      </p>
      
      
      <div className="mb-4">
        <label className="font-medium">Compliance Confidence: {complianceScore}%</label>
        <div className="w-full bg-gray-200 h-3 rounded">
          <div
            className="h-3 rounded bg-green-500 transition-all duration-300"
            style={{ width: `${complianceScore}%` }}
          />
        </div>
      </div>

<ul className="space-y-2">
        {exclusionItems.map((item) => (
          <li key={item} className="flex items-start space-x-2">
            <input
              type="checkbox"
              id={item}
              className="mt-1"
              checked={checkedItems.includes(item)}
              onChange={() => handleCheck(item)}
            />
            <label htmlFor={item} className="flex-1">
              {item}
              <Tooltip content={tooltipMap[item]} />
            </label>
          </li>
        ))}
      </ul>

        {exclusionItems.map((item) => (
          <li key={item} className="flex items-center">
            <input
              type="checkbox"
              id={item}
              className="mr-2"
              checked={checkedItems.includes(item)}
              onChange={() => handleCheck(item)}
            />
            <label htmlFor={item}>{item}</label>
          </li>
        ))}
      </ul>
      {checkedItems.length > 0 && (
        <div className="mt-4">
          <label className="block mb-2 font-medium">
            Upload supporting documentation:
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="border rounded p-2 w-full"
          />
        </div>
      )}
    </div>
  );
}
