"use client";

import { useState } from "react";
import DashboardSideNav from "./DashboardSideNav";
import DashboardTopNav from "./DashboardTopNav";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSideNav collapsed={collapsed} setCollapsed={setCollapsed} />
      <DashboardTopNav sidebarCollapsed={collapsed} />
      <div
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "ml-16" : "ml-64"
        } pt-16`}
      >
        <div className="p-2 overflow-auto h-full">
          <div className="bg-white rounded-lg shadow-sm p-6 min-h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
