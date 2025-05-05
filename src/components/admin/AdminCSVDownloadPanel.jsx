
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import {
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  Box
} from '@mui/material';

export default function AdminCSVDownloadPanel() {
  const [userRole, setUserRole] = useState('');
  const [checkingRole, setCheckingRole] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('success');

  useEffect(() => {
    const auth = getAuth();
    auth.currentUser?.getIdTokenResult().then(result => {
      setUserRole(result.claims.role || '');
      setCheckingRole(false);
    });
  }, []);

  const handleDownload = async () => {
    setLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      setAlertMsg('User not signed in');
      setAlertType('error');
      setAlertOpen(true);
      setLoading(false);
      return;
    }

    try {
      const token = await user.getIdToken();
      const response = await fetch('https://YOUR_REGION.cloudfunctions.net/exportAdminUsersCSV', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch CSV');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'admin_users.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();

      setAlertMsg('CSV downloaded successfully');
      setAlertType('success');
    } catch (err) {
      console.error(err);
      setAlertMsg('Error downloading CSV');
      setAlertType('error');
    }

    setAlertOpen(true);
    setLoading(false);
  };

  if (checkingRole) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (userRole !== 'admin') {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">Access denied. Admins only.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h6" gutterBottom>
          Download Admin Users CSV
        </Typography>
        <Typography variant="body2" gutterBottom>
          Export a real-time CSV of all users with admin privileges — includes display names and activity.
        </Typography>
        <Box mt={3}>
          <Button
            variant="contained"
            onClick={handleDownload}
            disabled={loading}
            fullWidth
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Preparing...' : 'Download CSV'}
          </Button>
        </Box>
      </Paper>

      <Snackbar open={alertOpen} autoHideDuration={5000} onClose={() => setAlertOpen(false)}>
        <Alert severity={alertType} onClose={() => setAlertOpen(false)} sx={{ width: '100%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
