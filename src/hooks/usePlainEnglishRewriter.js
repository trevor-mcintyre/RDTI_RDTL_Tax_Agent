// frontend/hooks/usePlainEnglishRewriter.js
import { useState } from 'react';

export function usePlainEnglishRewriter() {
  const [loading, setLoading] = useState(false);
  const [plainText, setPlainText] = useState('');

  const rewrite = async (inputText) => {
    setLoading(true);
    try {
      const res = await fetch('/api/rewrite-plain-english', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText }),
      });
      const data = await res.json();
      setPlainText(data.plainText || '');
    } catch (err) {
      console.error('Failed to rewrite:', err);
    } finally {
      setLoading(false);
    }
  };

  return { plainText, rewrite, loading };
}