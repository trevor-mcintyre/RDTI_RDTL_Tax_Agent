import React from "react";
import { useWorkspace } from "../context/WorkspaceContext";

export default function WorkspaceSwitcher() {
  const { workspaceId = "", setWorkspaceId = () => {} } = useWorkspace() || {};
  const clients = ["Client A", "Client B", "Client C"];

  return (
    <div className="text-sm text-right">
      <label htmlFor="workspace-select" className="font-semibold mr-2">
        Workspace:
      </label>
      <select
        id="workspace-select"
        value={workspaceId}
        onChange={(e) => setWorkspaceId(e.target.value)}
        className="p-1 border rounded"
      >
        {clients.map((client) => (
          <option key={client} value={client}>
            {client}
          </option>
        ))}
      </select>
    </div>
  );
}