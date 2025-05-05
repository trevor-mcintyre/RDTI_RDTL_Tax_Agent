import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function EvidenceUpload({ activityId, onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const storage = getStorage();
  const db = getFirestore();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !activityId) return;
    setUploading(true);
    const fileRef = ref(storage, \`evidence/\${activityId}/\${file.name}\`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    const fileMeta = {
      name: file.name,
      url,
      uploadedAt: new Date().toISOString()
    };

    const activityRef = doc(db, "activities", activityId);
    await updateDoc(activityRef, {
      evidence: arrayUnion(fileMeta)
    });

    setDownloadURL(url);
    setUploading(false);
    if (onUploadComplete) onUploadComplete(url);
  };

  return (
    <div className="p-4 border rounded bg-white shadow mt-4">
      <h3 className="font-semibold mb-2">📎 Upload Evidence for Activity ID: {activityId}</h3>
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload Evidence'}
      </button>
      {downloadURL && (
        <p className="mt-2 text-green-600">
          ✅ File uploaded. <a href={downloadURL} target="_blank" rel="noopener noreferrer" className="underline">View file</a>
        </p>
      )}
    <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
  <h3 className="text-md font-semibold mb-2">🧠 Suggested Evidence to Upload</h3>
  <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
    <li>GitHub / Git Logs (commits, diffs, branches)</li>
    <li>Pull Requests & Feature Branches</li>
    <li>Technical Design Documents (Notion, GDocs, Confluence)</li>
    <li>Architecture Diagrams or Wireframes</li>
    <li>Meeting Notes discussing R&D plans or technical challenges</li>
    <li>Systematic Approach Notes (experiments, trials, testing logs)</li>
    <li>Emails or Slack Threads showing discussions of technical uncertainty</li>
    <li>Time Tracking Reports (Toggl, Harvest, etc)</li>
    <li>Payroll Summaries with R&D effort allocations</li>
    <li>Invoices from R&D contractors or consultants</li>
    <li>Screenshots of prototypes or dev environments</li>
    <li>Loom-style or demo videos showing R&D work</li>
    <li>Exported tickets from Jira / Linear / Trello with descriptions</li>
    <li>Spreadsheets or tables showing comparative analysis</li>
  </ul>
</div>
</div>
  );
}