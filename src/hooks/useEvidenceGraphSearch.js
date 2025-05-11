// frontend/hooks/useEvidenceGraphSearch.js
import { useState } from 'react';

export function useEvidenceGraphSearch() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const search = async (query, entries) => {
    setLoading(true);
    try {
      const res = await fetch('/api/search-evidence-graph', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, entries }),
      });
      const data = await res.json();
      setResults(data.matchedIds || []);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return { results, search, loading };
}