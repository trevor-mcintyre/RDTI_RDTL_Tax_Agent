import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

export default function ReviewerChecklist({ activityId }) {
  const [notes, setNotes] = useState('');
  const [completed, setCompleted] = useState(false);
  const db = getFirestore();

  useEffect(() => {
    const fetch = async () => {
      const ref = doc(db, 'activities', activityId);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setNotes(data.reviewerNotes || '');
        setCompleted(data.reviewerCompleted || false);
      }
    };
    fetch();
  }, [activityId]);

  const saveReview = async () => {
    const ref = doc(db, 'activities', activityId);
    await updateDoc(ref, {
      reviewerNotes: notes,
      reviewerCompleted: completed
    });
    alert('✅ Review notes saved!');
  };

  return (
    <div className="p-4 bg-gray-100 rounded mt-4">
      <h3 className="font-bold mb-2">📝 Reviewer Notes & Checklist</h3>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full h-24 border rounded p-2"
        placeholder="Enter any comments or clarifications needed…"
      />
      <div className="mt-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          <span>Mark activity as reviewed & complete</span>
        </label>
      </div>
      <button
        onClick={saveReview}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        💾 Save Review
      </button>
    </div>
  );
}