import React, { createContext, useContext, useState } from "react";
import { Roles } from "../roles"; // Assumes Roles enum is defined in this file

const RoleContext = createContext();

/**
 * Provides the current user's role and a setter to update it.
 * Defaults to ADMIN for development/testing — update as needed.
 */
export const RoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(Roles.ADMIN); // Change to Roles.USER in production if needed

  return (
    <RoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </RoleContext.Provider>
  );
};

/**
 * Hook to access and update the current role.
 */
export const useRole = () => useContext(RoleContext);
