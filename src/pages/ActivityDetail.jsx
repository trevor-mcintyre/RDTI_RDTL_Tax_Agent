import React from 'react';
import { useParams } from 'react-router-dom';
import EvidenceUpload from '../components/EvidenceUpload';
import EvidenceList from '../components/EvidenceList';

export default function ActivityDetail() {
  const { activityId } = useParams();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">🧪 Activity Details</h1>
      <p className="mb-6 text-gray-700">
        You’re viewing the details for Activity ID: <strong>{activityId}</strong>
      </p>

      <EvidenceUpload activityId={activityId} />
      <EvidenceList activityId={activityId} />
    </div>
  );
}