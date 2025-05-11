import React from "react";
import { Navigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import { getAuth } from "firebase/auth";

export default function RequireAuth({ children, allowedRoles }) {
  const { userRole } = useRole();
  const user = getAuth().currentUser;

  // ⛔ Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ⛔ Role mismatch (only if allowedRoles are specified)
  const hasAccess =
    !allowedRoles || (Array.isArray(allowedRoles) && allowedRoles.includes(userRole));

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center h-screen text-center text-red-600">
        <div>
          <h2 className="text-xl font-semibold">Access Denied</h2>
          <p className="text-gray-700">You don’t have permission to view this page.</p>
        </div>
      </div>
    );
  }

  // ✅ Authenticated and authorized
  return children;
}

