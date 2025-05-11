import React from 'react';
import { useRoleAccess } from '../../hooks/useRoleAccess';

const RoleIndicator = ({ className = '' }) => {
  const { role } = useRoleAccess();

  const roleStyles = {
    admin: 'bg-purple-100 text-purple-700',
    contributor: 'bg-blue-100 text-blue-700',
    accountant: 'bg-green-100 text-green-700',
    reviewer: 'bg-gray-100 text-gray-700'
  };

  const roleLabels = {
    admin: 'Admin',
    contributor: 'Contributor',
    accountant: 'Accountant',
    reviewer: 'Reviewer'
  };

  return (
    <span 
      className={`px-2 py-1 text-xs font-medium rounded-full ${roleStyles[role] || roleStyles.reviewer} ${className}`}
    >
      {roleLabels[role] || 'Reviewer'}
    </span>
  );
};

export default RoleIndicator;