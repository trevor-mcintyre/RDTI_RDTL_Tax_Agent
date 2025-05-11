import React, { createContext, useContext, useState } from 'react';

const EvidenceContext = createContext();

export function EvidenceProvider({ children }) {
  const [evidenceItems, setEvidenceItems] = useState([]);

  const addEvidence = (files, type) => {
    setEvidenceItems((prev) => [...prev, { files, type }]);
  };

  return (
    <EvidenceContext.Provider value={{ evidenceItems, addEvidence }}>
      {children}
    </EvidenceContext.Provider>
  );
}

export function useEvidence() {
  const context = useContext(EvidenceContext);
  if (!context) {
    throw new Error('useEvidence must be used within an EvidenceProvider');
  }
  return context;
}