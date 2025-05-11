import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FileText, List, ShoppingCart } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
  { to: "/claims", label: "Claims", icon: <FileText size={18} /> },
  { to: "/activity", label: "Activities", icon: <List size={18} /> },
  { to: "/checkout", label: "Checkout", icon: <ShoppingCart size={18} /> },
];

export default function SidebarNav({ onLinkClick }) {
  const location = useLocation();

  return (
    <nav className="space-y-2">
      {navItems.map(({ to, label, icon }) => (
        <Link
          key={to}
          to={to}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
            location.pathname === to
              ? "bg-blue-100 text-blue-700 font-medium"
              : "hover:bg-gray-100"
          }`}
          onClick={onLinkClick}
        >
          {icon}
          {label}
        </Link>
      ))}
    </nav>
  );
}