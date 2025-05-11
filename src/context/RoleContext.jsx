
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const ADMIN_EMAILS = ["admin@example.com"]; // Replace with your admin emails

const RoleContext = createContext({ isAdmin: false });

export const RoleProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && ADMIN_EMAILS.includes(user.email)) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return (
    <RoleContext.Provider value={{ isAdmin }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
