import "./styles/theme.css";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import ErrorBoundary from "./components/ErrorBoundary";
import ToastWrapper from "./components/ToastWrapper";
import FeedbackWidget from "./components/FeedbackWidget";
import { RoleProvider } from "./context/RoleContext";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import DemoShowcase from "./pages/DemoShowcase";
import PriorYearClaims from "./pages/PriorYearClaims";
import ActivityDetail from "./pages/ActivityDetail";
import CheckoutPage from "./pages/CheckoutPage";
import AuthForm from "./components/AuthForm";

import AdminDashboard from "./pages/admin/Dashboard";
import Reports from "./pages/Reports";
import Clients from "./pages/Clients";

import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Roles } from "./roles";

function LoginRoute() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setIsAuthed(!!user);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Checking login status...
      </div>
    );
  }

  return isAuthed ? <Navigate to="/dashboard" replace /> : <AuthForm />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <RoleProvider>
        <Router>
          <Routes>
            {/* Public login route */}
            <Route path="/login" element={<LoginRoute />} />

            {/* Protected routes under shared layout */}
            <Route element={<RequireAuth><Layout /></RequireAuth>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/claims" element={<PriorYearClaims />} />
              <Route path="/activity" element={<ActivityDetail />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/demo" element={<DemoShowcase />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/clients" element={<Clients />} />
            </Route>

            {/* Admin-only route */}
            <Route
              path="/admin"
              element={
                <RequireAuth allowedRoles={[Roles.ADMIN]}>
                  <AdminDashboard />
                </RequireAuth>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>

        <ToastWrapper />
        <FeedbackWidget />
      </RoleProvider>
    </ErrorBoundary>
  );
}
