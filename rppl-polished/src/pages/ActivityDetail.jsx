import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EvidenceUpload from "../components/EvidenceUpload";
import EvidenceList from "../components/EvidenceList";
import Card from "../components/Card";
import Loading from "../components/Loading";

export default function ActivityDetail() {
  const { activityId } = useParams();
  const [uploadReady, setUploadReady] = useState(false);
  const [listReady, setListReady] = useState(false);

  // Simulate loading or wait for child component to call a callback
  useEffect(() => {
    setTimeout(() => setUploadReady(true), 500); // replace with real readiness logic
    setTimeout(() => setListReady(true), 500);   // or use effect from actual fetches
  }, []);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">🧪 Activity Details</h1>
        <p className="text-sm text-gray-600">
          Viewing details for activity ID:{" "}
          <span className="font-medium text-gray-800">{activityId}</span>
        </p>
      </header>

      <Card title="Upload Evidence">
        {uploadReady ? (
          <EvidenceUpload activityId={activityId} />
        ) : (
          <Loading message="Preparing upload tools..." />
        )}
      </Card>

      <Card title="Submitted Evidence">
        {listReady ? (
          <EvidenceList activityId={activityId} />
        ) : (
          <Loading message="Loading submitted evidence..." />
        )}
      </Card>
    </div>
  );
}