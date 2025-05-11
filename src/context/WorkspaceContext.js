import React, { createContext, useState, useContext } from "react";

const WorkspaceContext = createContext();

/**
 * Provides the active workspace ID and an updater function.
 * Defaults to "Client A" — replace with dynamic logic as needed.
 */
export const WorkspaceProvider = ({ children }) => {
  const [workspaceId, setWorkspaceId] = useState("Client A");

  return (
    <WorkspaceContext.Provider value={{ workspaceId, setWorkspaceId }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

/**
 * Hook to access and update the current workspace.
 */
export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};
