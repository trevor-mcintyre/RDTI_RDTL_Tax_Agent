import { useContext } from 'react';
import { RoleContext } from '../context/RoleContext';

export const UserRole = {
  ADMIN: 'admin',
  CONTRIBUTOR: 'contributor',
  ACCOUNTANT: 'accountant',
  REVIEWER: 'reviewer'
};

export const useRoleAccess = () => {
  const { role } = useContext(RoleContext);

  const permissions = {
    [UserRole.ADMIN]: {
      canSubmit: true,
      canEdit: true,
      canView: true,
      canExport: true,
      canManageUsers: true,
      canConnectGitHub: true,
      canDeleteClaims: true
    },
    [UserRole.CONTRIBUTOR]: {
      canSubmit: false,
      canEdit: true,
      canView: true,
      canExport: false,
      canManageUsers: false,
      canConnectGitHub: true,
      canDeleteClaims: false
    },
    [UserRole.ACCOUNTANT]: {
      canSubmit: false,
      canEdit: false,
      canView: true,
      canExport: true,
      canManageUsers: false,
      canConnectGitHub: false,
      canDeleteClaims: false
    },
    [UserRole.REVIEWER]: {
      canSubmit: false,
      canEdit: false,
      canView: true,
      canExport: false,
      canManageUsers: false,
      canConnectGitHub: false,
      canDeleteClaims: false
    }
  };

  return {
    role,
    ...permissions[role] || permissions[UserRole.REVIEWER],
    isAdmin: role === UserRole.ADMIN
  };
};