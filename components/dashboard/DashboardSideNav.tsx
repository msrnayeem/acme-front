"use client";

import { handleLogout } from "@/lib/logout";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CreditCard,
  Icon,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Package,
  Settings,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, ReactNode, cloneElement, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { SiAmazon, SiShopify } from "react-icons/si";
import { Toaster } from "sonner";

type LucideIconProps = React.ComponentProps<typeof Icon>;

interface NavItemProps {
  icon: ReactElement<LucideIconProps>;
  children: ReactNode;
  collapsed: boolean;
  active?: boolean;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  onClick?: () => void;
  href?: string;
}

const NavItem = ({
  icon,
  children,
  collapsed,
  active = false,
  hasSubmenu = false,
  isSubmenuOpen = false,
  onClick,
  href = "#",
}: NavItemProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center p-2.5 rounded-lg transition-colors ${
        active
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <span className="flex-shrink-0">
        {cloneElement(icon, {
          size: 20,
          className: active ? "text-blue-500" : "text-gray-500",
        })}
      </span>
      {!collapsed && (
        <span className="ml-3 flex-1 text-sm font-semibold flex justify-between items-center">
          {children}
          {hasSubmenu && (
            <span>
              {isSubmenuOpen ? (
                <ChevronUp size={16} className="text-gray-500" />
              ) : (
                <ChevronDown size={16} className="text-gray-500" />
              )}
            </span>
          )}
        </span>
      )}
    </Link>
  );
};

interface SubMenuItemProps {
  children: ReactNode;
  collapsed: boolean;
  href: string;
}

const SubMenuItem = ({ children, collapsed, href }: SubMenuItemProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center text-sm p-2 pl-11 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900 ${
        collapsed ? "hidden" : "block"
      }`}
    >
      {children}
    </Link>
  );
};

interface DashboardSideNavProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  activePath?: string;
}

const DashboardSideNav = ({
  collapsed,
  setCollapsed,
  activePath = "/dashboard",
}: DashboardSideNavProps) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    return activePath === path;
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 h-full fixed left-0 top-0 transition-all duration-300 z-30 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <Toaster />
      {/* Top Section with Logo */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between h-16">
        {!collapsed ? (
          <div className="flex items-center">
            <Image
              src="/acme-electronics.svg"
              alt="ACME Electronics Logo"
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
            />
          </div>
        ) : (
          <Zap className="text-orange-500 mx-auto" />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-gray-700"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="mt-2 overflow-y-auto h-[calc(100%-4rem)]">
        {/* Main Navigation */}
        <div className="px-3 space-y-1 py-2">
          <NavItem
            icon={<LayoutDashboard />}
            collapsed={collapsed}
            active={isActive("/dashboard")}
            href="/dashboard"
          >
            Dashboard
          </NavItem>

          <NavItem
            icon={<Package />}
            collapsed={collapsed}
            active={isActive("/products")}
            href="/dashboard/products"
          >
            Products
          </NavItem>
          <NavItem
            icon={<ListOrdered />}
            collapsed={collapsed}
            active={isActive("/orders")}
            href="/dashboard/orders"
          >
            Orders
          </NavItem>

          {/* Products Submenu */}
          {/* <div>
            <NavItem
              icon={<ShoppingCart />}
              collapsed={collapsed}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "products"}
              onClick={() => toggleSubmenu("products")}
              active={
                isActive("/products") ||
                isActive("/products/categories") ||
                isActive("/products/new")
              }
            >
              Products
            </NavItem>
            {openSubmenu === "products" && !collapsed && (
              <div className="space-y-1">
                <SubMenuItem collapsed={collapsed} href="/products">
                  All Products
                </SubMenuItem>
                <SubMenuItem collapsed={collapsed} href="/products/categories">
                  Categories
                </SubMenuItem>
                <SubMenuItem collapsed={collapsed} href="/products/new">
                  Add New
                </SubMenuItem>
              </div>
            )}
          </div> */}

          <NavItem
            icon={<BiCategory />}
            collapsed={collapsed}
            active={isActive("/category")}
            href="/dashboard/category"
          >
            Category
          </NavItem>
          <NavItem
            icon={<Users />}
            collapsed={collapsed}
            active={isActive("/users")}
            href="/dashboard/users"
          >
            Users
          </NavItem>
          <NavItem
            icon={<CreditCard />}
            collapsed={collapsed}
            active={isActive("/payments")}
            href="/dashboard/payments"
          >
            Payments
          </NavItem>
        </div>

        <div className="border-t border-gray-200 mx-3 my-2"></div>

        {/* Integrations */}
        <div className="px-3 space-y-1 py-2">
          {!collapsed && (
            <p className="text-gray-500 text-xs uppercase font-semibold">
              Integrations
            </p>
          )}
          {/* <NavItem
            icon={<SiAmazon />}
            collapsed={collapsed}
            active={isActive("/integrations/amazon")}
            href="/dashboard/amazon"
          >
            Amazon
          </NavItem> */}

          {/* Products Submenu */}
          <div>
            <NavItem
              icon={<SiAmazon />}
              collapsed={collapsed}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "amazon"}
              onClick={() => toggleSubmenu("amazon")}
              active={
                isActive("/dashboard/amazon/dashboard") ||
                isActive("/dashboard/amazon/products") ||
                isActive("/dashboard/amazon/refund")
              }
            >
              Amazon
            </NavItem>
            {openSubmenu === "amazon" && !collapsed && (
              <div className="space-y-1">
                <SubMenuItem
                  collapsed={collapsed}
                  href="/dashboard/amazon/dashboard"
                >
                  Dashboard
                </SubMenuItem>
                <SubMenuItem
                  collapsed={collapsed}
                  href="/dashboard/amazon/products"
                >
                  Products
                </SubMenuItem>
                <SubMenuItem
                  collapsed={collapsed}
                  href="/dashboard/amazon/refund"
                >
                  Refund
                </SubMenuItem>
              </div>
            )}
          </div>

          <NavItem
            icon={<SiShopify />}
            collapsed={collapsed}
            active={isActive("/integrations/shopify")}
            href="/integrations/shopify"
          >
            Shopify
          </NavItem>
        </div>

        <div className="border-t border-gray-200 mx-3 my-2"></div>

        {/* Settings */}
        <div className="px-3 space-y-0.5 py-1.5">
          <NavItem
            icon={<Settings />}
            collapsed={collapsed}
            active={isActive("/settings")}
            href="/settings"
          >
            Settings
          </NavItem>
          <NavItem
            icon={<LogOut />}
            collapsed={collapsed}
            onClick={handleLogout}
          >
            Logout
          </NavItem>
        </div>
      </nav>
    </div>
  );
};

export default DashboardSideNav;
