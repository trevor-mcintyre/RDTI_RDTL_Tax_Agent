
import { EvidenceProvider } from './context/EvidenceContext';
import PriorYearClaims from './pages/PriorYearClaims';
import React
import PriorYearClaims from './pages/PriorYearClaims';
import Dashboard from './pages/Dashboard'; from 'react';
import PriorYearClaims from './pages/PriorYearClaims';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';\nimport PriorYearClaims from './pages/PriorYearClaims';
import CheckoutPage from './pages/CheckoutPage';
import PriorYearClaims from './pages/PriorYearClaims';
import AdminRoute from './routes/AdminRoute';
import PriorYearClaims from './pages/PriorYearClaims';
import AdminCSVDownloadPanel from './components/admin/AdminCSVDownloadPanel';

function App() {
  return (
  <EvidenceProvider>
    <Router>
    <EvidenceProvider>
    <Router>
      <Routes>\n        {
  path: "/checkout",
  element: <CheckoutPage />
},
        <Route path="/admin/export" element={<AdminRoute element={AdminCSVDownloadPanel} />} />
        <Route path="/" element={<Dashboard /> // div>Welcome to RDTI/RDTL Companion App</div>} />
        <Route path="/claim/history" element={<PriorYearClaims />} />
</Routes>
    </Router>
  );
}

export default App;