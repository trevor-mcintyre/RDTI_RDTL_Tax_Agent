
import React, { createContext, useContext, useState } from "react";
import { Roles } from "../roles";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  // 👇 Set this to change the current user's role for testing
  const [userRole, setUserRole] = useState(Roles.ADMIN);

  return (
    <RoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
