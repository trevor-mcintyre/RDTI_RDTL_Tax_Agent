// frontend/hooks/useEvidenceTagger.js
import { useState } from 'react';

export function useEvidenceTagger() {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);

  const tagEvidence = async (fileName, fileText) => {
    setLoading(true);
    try {
      const res = await fetch('/api/tag-evidence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, fileContent: fileText }),
      });
      const data = await res.json();
      setTags(data.tags || []);
    } catch (err) {
      console.error('Failed to tag evidence:', err);
    } finally {
      setLoading(false);
    }
  };

  return { tags, tagEvidence, loading };
}