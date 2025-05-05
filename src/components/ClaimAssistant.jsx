import React
import MotivationBanner from '../components/MotivationBanner';, { useState } from 'react';
import { askClaimQuestion } from '../utils/aiAssistant';

export default function ClaimAssistant({ companyId }) {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResponse('');
    try {
      const answer = await askClaimQuestion(companyId, question);
      setResponse(answer);
    } catch (err) {
      console.error('Error asking question:', err);
      setResponse('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow mt-6 bg-white">
      <h3 className="text-lg font-bold mb-2">🧠 Ask About Your Claim</h3>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="e.g. What is our biggest cost area?"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleAsk}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Thinking…' : 'Ask GPT'}
      </button>
      {response && (
        <div className="mt-4 p-3 bg-gray-100 rounded border">
          <strong>Answer:</strong>
          <p className="mt-1 whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
}