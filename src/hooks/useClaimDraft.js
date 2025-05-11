// frontend/hooks/useClaimDraft.js
import { useState } from 'react';

export function useClaimDraft() {
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState('');

  const draftClaim = async (evidenceItems) => {
    setLoading(true);
    try {
      const res = await fetch('/api/draft-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ evidenceItems }),
      });
      const data = await res.json();
      setDraft(data.draft || '');
    } catch (err) {
      console.error('Failed to draft claim:', err);
    } finally {
      setLoading(false);
    }
  };

  return { draft, draftClaim, loading };
}