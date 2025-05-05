
import React, { createContext, useContext, useState } from 'react';

const EvidenceContext = createContext();

export function EvidenceProvider({ children }) {
  const [evidenceList, setEvidenceList] = useState([]);

  const addEvidence = (files, tag = 'general') => {
    const taggedFiles = files.map(file => ({ file, tag }));
    console.log('Adding evidence:', taggedFiles);
    setEvidenceList(prev => [...prev, ...taggedFiles]);
  };

  console.log('EvidenceContext initialized. Current evidenceList:', evidenceList);
  return (
    <EvidenceContext.Provider value={{ evidenceList, addEvidence }}>
      {children}
    </EvidenceContext.Provider>
  );
}

export const useEvidence = () => useContext(EvidenceContext);
