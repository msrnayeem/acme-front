"use client";

import { useUserStore } from "@/app/store/useUserStore";
import { handleLogout } from "@/lib/logout";
import { Search, Bell, ChevronDown, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Toaster } from "sonner";

const DashboardTopNav = ({
  sidebarCollapsed,
}: {
  sidebarCollapsed: boolean;
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  return (
    <header
      className={`bg-white shadow-sm fixed top-0 h-16 z-20 transition-all duration-300 ${
        sidebarCollapsed ? "left-16 right-0" : "left-64 right-0"
      }`}
    >
      <div className="flex items-center justify-between px-6 h-full">
        <Toaster />
        <div className="flex items-center flex-1 max-w-2xl">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-700" />
            </div>
            <input
              className="block text-slate-600 w-full pl-10 pr-4 py-2.5 border border-gray-400 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 text-base"
              placeholder="Search products, customers, orders..."
              type="search"
            />
          </div>
        </div>

        {/* Notification and User Info */}
        <div className="flex items-center space-x-4 ml-6">
          <button className="relative group p-2 rounded-md bg-white border border-gray-300 hover:shadow-sm transition duration-200">
            <Bell
              className="text-gray-600 group-hover:text-blue-600"
              size={20}
            />
            {""}
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center space-x-3 focus:outline-none hover:bg-gray-100 px-2 py-1 rounded-lg transition"
            >
              <div className="h-9 w-9 rounded-md bg-gray-200 flex items-center justify-center shadow-sm">
                <User size={18} className="text-gray-700" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-semibold text-gray-800">
                  {user?.name ? user.name : "Admin User"}
                </div>
                <div className="text-xs text-gray-500">Admin</div>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-500 transition-transform duration-200 ${
                  userDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-20 border border-gray-200">
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  Settings
                </Link>
                <p
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardTopNav;
