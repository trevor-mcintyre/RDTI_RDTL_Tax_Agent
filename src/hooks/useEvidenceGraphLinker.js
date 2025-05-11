// frontend/hooks/useEvidenceGraphLinker.js
import { useState } from 'react';

export function useEvidenceGraphLinker() {
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);

  const link = async (meetings, evidences) => {
    setLoading(true);
    try {
      const res = await fetch('/api/link-evidence-graph', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meetings, evidences }),
      });
      const data = await res.json();
      setLinks(data.links || []);
    } catch (err) {
      console.error('Evidence linking failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return { links, link, loading };
}