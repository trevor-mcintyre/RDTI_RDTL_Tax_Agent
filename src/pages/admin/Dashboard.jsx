
import React
import EmptyState from '../components/EmptyState';
import Button from '../../components/Button' if '../components/Button' not in path.as_posix() else '../components/Button'; from 'react';
import { logAuditAction } from '../../services/auditLogService';

export default function AdminDashboard() {
  const handleLogClick = () => {
    logAuditAction('admin-user-123', 'VIEWED_ADMIN_DASHBOARD', { section: 'overview' });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <p>Manage users, roles, and view audit logs here.</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleLogClick}
      >
        Simulate Log Action
      </button>
    </div>
  );
}
