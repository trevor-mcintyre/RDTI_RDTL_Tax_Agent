import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  Home,
  FileText,
  List,
  ShoppingCart,
  Menu,
  X
} from "lucide-react";

import WorkspaceSwitcher from "./WorkspaceSwitcher";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
  { to: "/claims", label: "Claims", icon: <FileText size={18} /> },
  { to: "/activity", label: "Activities", icon: <List size={18} /> },
  { to: "/checkout", label: "Checkout", icon: <ShoppingCart size={18} /> },
];

export default function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform bg-white shadow-md w-64 p-4 transition-transform duration-200 ease-in-out
        z-30 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:inset-auto`}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-blue-700">R&D Tax Agent</h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>
        <nav className="space-y-2">
          {navItems.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition
              ${location.pathname === to ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-gray-100"}`}
              onClick={() => setSidebarOpen(false)}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="bg-white shadow-md px-4 py-3 flex justify-between items-center md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
          <h2 className="text-lg font-semibold">Menu</h2>
          <div className="w-6" />
          <WorkspaceSwitcher />
        </header>

        {/* Content */}
        <main className="p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}