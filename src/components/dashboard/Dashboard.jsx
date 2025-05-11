import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CompanyContext } from '../../context/CompanyContext';
import { useRoleAccess } from '../../hooks/useRoleAccess';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { company } = useContext(CompanyContext);
  const { canSubmit, canExport, canConnectGitHub } = useRoleAccess();
  
  const [stats, setStats] = useState({
    totalClaims: 0,
    completedClaims: 0,
    totalValue: 0
  });

  useEffect(() => {
    // Mock data - replace with actual Firestore queries
    setStats({
      totalClaims: 20,
      completedClaims: 13,
      totalValue: 124500
    });
  }, []);

  const progress = (stats.completedClaims / stats.totalClaims) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.displayName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Claims</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalClaims}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedClaims}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total R&D Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats.totalValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Claims Progress</h3>
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-blue-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="absolute right-0 -top-6 text-sm text-gray-600">
            {Math.round(progress)}%
          </span>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          {stats.completedClaims} of {stats.totalClaims} claims completed
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {canConnectGitHub && (
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Connect GitHub</h3>
              <p className="text-gray-600 text-sm mb-4">
                Auto-generate claims from your repository
              </p>
              <Link to="/github">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Connect Now
                </button>
              </Link>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="text-center">
            <h3 className="font-semibold mb-2">New Claim</h3>
            <p className="text-gray-600 text-sm mb-4">
              Add a new R&D tax claim
            </p>
            <Link to="/claims">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Create Claim
              </button>
            </Link>
          </div>
        </div>

        {canExport && (
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Export Data</h3>
              <p className="text-gray-600 text-sm mb-4">
                Generate submission package
              </p>
              <Link to="/export">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Export Now
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {canSubmit && (
        <div className="text-center">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg font-medium">
            Submit R&D Claims
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;