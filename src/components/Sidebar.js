import React from "react";

import { Link, useLocation } from "react-router-dom";
import {
  Users,
  Map,
  LayoutDashboard,
  Calendar,
  LogOut,
  MessageCircleCodeIcon,
  GemIcon,
  Waves,
} from "lucide-react";

import { logout } from "../app/auth/authSlice";
import { useDispatch } from "react-redux";

export default function Sidebar() {
  const dispatch = useDispatch();
  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { id: "users", icon: Users, label: "Users", path: "/users" },
    { id: "tours", icon: Map, label: "Tours", path: "/tours" },
    { id: "bookings", icon: Calendar, label: "Bookings", path: "/bookings" },
    {
      id: "reviews",
      icon: MessageCircleCodeIcon,
      label: "Reviews",
      path: "/reviews",
    },
    {
      id: "vip",
      icon: GemIcon,
      label: "VIP",
      path: "/vip",
    },
    {
      id: "nile",
      icon: Waves,
      label: "Nile",
      path: "/nile",
    },
  ];

  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="h-100 w-64 bg-gray-900 text-white p-6">
      <div className="flex items-center gap-3 mb-8">
        <Map className="w-8 h-8 text-emerald-500" />
        <h1 className="text-xl font-bold">TourAdmin</h1>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${
                  location.pathname === item.path
                    ? "bg-emerald-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        className=" flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white transition-colors"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}
