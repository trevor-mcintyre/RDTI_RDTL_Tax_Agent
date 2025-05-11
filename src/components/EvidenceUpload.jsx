import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { getAuth } from "firebase/auth";
import { logAuditAction } from "../services/auditLogger";

export default function EvidenceUpload({ activityId, onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);

  const db = getFirestore();
  const storage = getStorage();
  const user = getAuth().currentUser;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !activityId) {
      toast.error("Please select a file before uploading.");
      return;
    }

    setUploading(true);

    try {
      const fileRef = ref(storage, `evidence/${activityId}/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      const fileMeta = {
        name: file.name,
        url,
        uploadedAt: new Date().toISOString(),
      };

      const activityRef = doc(db, "activities", activityId);
      await updateDoc(activityRef, {
        evidence: arrayUnion(fileMeta),
      });

      // ✅ Log audit action
      if (user) await logAuditAction(user.uid, "UPLOAD_EVIDENCE", { activityId, fileName: file.name });

      // ✅ Show undoable toast
      toast((t) => (
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm">📄 File uploaded</span>
          <button
            onClick={async () => {
              try {
                await deleteObject(fileRef);
                await updateDoc(activityRef, {
                  evidence: arrayRemove(fileMeta),
                });
                toast.dismiss(t.id);
                toast.success("Undo complete. File removed.");

                // 🔄 Log undo
                if (user) await logAuditAction(user.uid, "UNDO_UPLOAD_EVIDENCE", { activityId, fileName: file.name });
              } catch (err) {
                console.error("Undo failed:", err);
                toast.error("Could not undo upload.");
              }
            }}
            className="text-blue-600 text-sm hover:underline"
          >
            Undo
          </button>
        </div>
      ), { duration: 7000 });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);

      setFile(null);
      if (onUploadComplete) onUploadComplete(fileMeta);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0 file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>

      {saved && <p className="text-green-600 text-sm">Saved ✔</p>}
    </div>
  );
}
