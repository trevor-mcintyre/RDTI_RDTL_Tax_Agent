
import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const AdminRoute = ({ element: Component, ...rest }) => {
  const [checkingRole, setCheckingRole] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      setCheckingRole(false);
      return;
    }

    user.getIdTokenResult().then((idTokenResult) => {
      const role = idTokenResult.claims.role;
      setIsAdmin(role === 'admin');
      setCheckingRole(false);
    });
  }, []);

  if (checkingRole) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return isAdmin ? <Route {...rest} element={<Component />} /> : <Navigate to="/" replace />;
};

export default AdminRoute;
