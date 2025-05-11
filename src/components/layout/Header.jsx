import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CompanyContext } from '../../context/CompanyContext';
import { useRoleAccess } from '../../hooks/useRoleAccess';
import RoleIndicator from '../ui/RoleIndicator';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { company } = useContext(CompanyContext);
  const { canExport, canConnectGitHub } = useRoleAccess();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', show: true },
    { name: 'Claims', href: '/claims', show: true },
    { name: 'GitHub', href: '/github', show: canConnectGitHub },
    { name: 'Export', href: '/export', show: canExport },
    { name: 'Activity', href: '/activity', show: true }
  ].filter(item => item.show);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                R
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">RDTI Agent</span>
            </Link>
            {company && (
              <span className="ml-4 text-sm text-gray-600 hidden md:inline">
                {company.name}
              </span>
            )}
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <RoleIndicator />
            
            <div className="flex items-center space-x-2">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900">{user?.displayName}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              
              <button
                onClick={logout}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;