import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { WorkspaceProvider } from "./context/WorkspaceContext";

ReactDOM.render(
  <WorkspaceProvider>
    <App />
  </WorkspaceProvider>,
  document.getElementById("root")
);
