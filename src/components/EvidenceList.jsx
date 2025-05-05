import React
import { useEvidence } from '../context/EvidenceContext';, { useEffect, useState } from 'react';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

export default function EvidenceList({ activityId }) {
  const [evidence, setEvidence] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const unsub = onSnapshot(doc(db, 'activities', activityId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setEvidence(data.evidence || []);
      }
    });
    return () => unsub();
  }, [activityId]);

  return (
    <div className="mt-6">
      <h4 className="text-lg font-bold mb-2">🔍 Uploaded Evidence</h4>
      {evidence.length === 0 ? (
        <p className="text-gray-600">No evidence uploaded yet.</p>
      ) : (
        <ul className="space-y-2">
          {evidence.map((item, idx) => (
            <li key={idx} className="border p-2 rounded bg-gray-50 shadow-sm">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-600">
                Uploaded at: {new Date(item.uploadedAt).toLocaleString()}
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                View Evidence
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}