// frontend/hooks/useMissingEvidence.js
import { useState } from 'react';

export function useMissingEvidence() {
  const [loading, setLoading] = useState(false);
  const [missing, setMissing] = useState([]);

  const suggest = async (evidenceSummaries) => {
    setLoading(true);
    try {
      const res = await fetch('/api/suggest-missing-evidence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ evidenceSummaries }),
      });
      const data = await res.json();
      setMissing(data.missingEvidence || []);
    } catch (err) {
      console.error('Failed to suggest missing evidence:', err);
    } finally {
      setLoading(false);
    }
  };

  return { missing, suggest, loading };
}