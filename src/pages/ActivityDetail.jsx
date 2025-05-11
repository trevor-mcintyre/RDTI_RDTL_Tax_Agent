import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { logAuditAction } from "../services/auditLogService";

import EvidenceUpload from "../components/EvidenceUpload";
import EvidenceList from "../components/EvidenceList";
import Card from "../components/Card";
import Loading from "../components/Loading";

export default function ActivityDetail() {
  const { activityId } = useParams();
  const [uploadReady, setUploadReady] = useState(false);
  const [listReady, setListReady] = useState(false);

  useEffect(() => {
    // Simulate readiness (replace with real checks if needed)
    setTimeout(() => setUploadReady(true), 500);
    setTimeout(() => setListReady(true), 500);

    // 🔍 Log that the user viewed this activity
    const user = getAuth().currentUser;
    if (user) {
      logAuditAction(user.uid, "VIEWED_ACTIVITY_DETAIL", { activityId });
    }
  }, [activityId]);

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
