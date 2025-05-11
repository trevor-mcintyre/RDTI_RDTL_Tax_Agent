import React from 'react';

const glossary = {
  'core activity': 'An activity conducted to resolve scientific or technological uncertainty through a systematic approach.',
  'supporting activity': 'Activities directly related to core R&D, like design, planning, or supporting testing.',
  'systematic approach': 'A methodical plan of investigation involving testing and iteration.',
  'feedstock rule': 'A rule that adjusts deductions if the R&D work leads to saleable products or by-products.',
  'stu': 'Scientific or Technological Uncertainty. A key eligibility criterion for R&D activities under IRD rules.'
};

const GlossaryTooltip = ({ term = '' }) => {
  const text = glossary[term.toLowerCase()];
  if (!text) return null;

  return (
    <span className="relative group inline-block">
      <span className="underline decoration-dotted cursor-help ml-1 text-blue-600">[?]</span>
      <div className="absolute hidden group-hover:block w-64 bg-black text-white text-sm p-2 rounded z-50 shadow-lg -left-2 top-6">
        {text}
      </div>
    </span>
  );
};

export default GlossaryTooltip;
