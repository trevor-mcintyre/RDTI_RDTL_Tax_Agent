// frontend/hooks/useMeetingSummarizer.js
import { useState } from 'react';

export function useMeetingSummarizer() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [nextAction, setNextAction] = useState('');

  const summarizeMeeting = async (transcript) => {
    setLoading(true);
    try {
      const res = await fetch('/api/summarize-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      });
      const data = await res.json();
      setSummary(data.summary);
      setNextAction(data.nextBestAction);
    } catch (err) {
      console.error('Failed to summarize meeting:', err);
    } finally {
      setLoading(false);
    }
  };

  return { summary, nextAction, summarizeMeeting, loading };
}