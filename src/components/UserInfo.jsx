
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const UserInfo = () => {
  const [user] = useAuthState(auth);

  if (!user) return null;

  return (
    <div style={{ marginBottom: "1rem" }}>
      Signed in as: <strong>{user.displayName || user.email}</strong>
    </div>
  );
};

export default UserInfo;
