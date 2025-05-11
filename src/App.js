import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CompanyProvider } from './context/CompanyContext';
import { RoleProvider } from './context/RoleContext';
import { RequireAuth } from './components/auth/RequireAuth';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import Claims from './pages/Claims';
import GitHubConnector from './components/github/GitHubConnector';
import ExportManager from './components/export/ExportManager';
import ActivityLog from './pages/ActivityLog';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CompanyProvider>
          <RoleProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Navigate to="/dashboard" replace />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </RequireAuth>
                }
              />
              <Route
                path="/claims"
                element={
                  <RequireAuth>
                    <Layout>
                      <Claims />
                    </Layout>
                  </RequireAuth>
                }
              />
              <Route
                path="/github"
                element={
                  <RequireAuth>
                    <Layout>
                      <GitHubConnector />
                    </Layout>
                  </RequireAuth>
                }
              />
              <Route
                path="/export"
                element={
                  <RequireAuth>
                    <Layout>
                      <ExportManager />
                    </Layout>
                  </RequireAuth>
                }
              />
              <Route
                path="/activity"
                element={
                  <RequireAuth>
                    <Layout>
                      <ActivityLog />
                    </Layout>
                  </RequireAuth>
                }
              />
            </Routes>
          </RoleProvider>
        </CompanyProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;