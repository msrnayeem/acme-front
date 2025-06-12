// app/dashboard/layout.tsx
import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ACME-Electronics Admin Panel",
  description:
    "Welcome! to ACME-Electronics admin panel. Get your service as you want.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
