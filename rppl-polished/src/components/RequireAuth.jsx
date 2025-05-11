
import React from "react";
import { Navigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

// allowedRoles is an optional prop
const RequireAuth = ({ children, allowedRoles }) => {
  const { userRole } = useRole();

  if (!userRole || (allowedRoles && !allowedRoles.includes(userRole))) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
