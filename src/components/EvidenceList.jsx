import React, { useEffect, useState } from "react";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { toast } from "react-hot-toast";
import Loading from "./Loading";

export default function EvidenceList({ activityId }) {
  const [evidence, setEvidence] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getFirestore();
    const ref = doc(db, "activities", activityId);

    const unsub = onSnapshot(
      ref,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setEvidence(data.evidence || []);
        } else {
          setEvidence([]);
        }
      },
      (err) => {
        console.error("Error fetching evidence:", err);
        toast.error("Could not load evidence. Please try again later.");
        setError(err);
        setEvidence([]);
      }
    );

    return () => unsub();
  }, [activityId]);

  if (!evidence) return <Loading message="Loading submitted evidence..." />;

  return (
    <div className="mt-6">
      <h4 className="text-lg font-bold mb-2">🔍 Uploaded Evidence</h4>
      {evidence.length === 0 ? (
        <p className="text-gray-600">No evidence uploaded yet.</p>
      ) : (
        <ul className="space-y-2">
          {evidence.map((item, idx) => (
            <li key={idx} className="border p-2 rounded bg-gray-50 shadow-sm">
              <div className="font-medium">{item.name || item.filename || "Untitled File"}</div>
              {item.note && <p className="text-sm text-gray-600">{item.note}</p>}
              {item.uploadedAt && (
                <p className="text-xs text-gray-500 mt-1">
                  Uploaded at: {new Date(item.uploadedAt).toLocaleString()}
                </p>
              )}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline block mt-1"
              >
                View File
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
