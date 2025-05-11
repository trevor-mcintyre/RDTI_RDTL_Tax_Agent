import React
import MotivationBanner from '../components/MotivationBanner';, { useState } from 'react';
import { simulateClaimModule } from '../utils/simulationUtils';

export default function ClaimSimulationTool() {
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    if (!description || !cost) return;
    setLoading(true);
    setResult('');
    try {
      const output = await simulateClaimModule(description, cost);
      setResult(output);
    } catch (err) {
      console.error('Simulation error:', err);
      setResult('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 mt-6 border rounded shadow bg-white">
      <h3 className="text-lg font-bold mb-2">🧪 Claim Simulation Tool</h3>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows="3"
        placeholder="Describe your proposed R&D module..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        className="w-full p-2 border rounded mb-2"
        placeholder="Estimated cost (NZD)"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
      />
      <button
        onClick={handleSimulate}
        disabled={loading}
        className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
      >
        {loading ? 'Analyzing…' : 'Run Simulation'}
      </button>
      {result && (
        <div className="mt-4 p-3 bg-gray-100 rounded border whitespace-pre-wrap">
          <strong>Simulation Result:</strong>
          <p className="mt-1">{result}</p>
        </div>
      )}
    </div>
  );
}