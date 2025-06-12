"use client";

import {
  CustomTable,
  CustomTableBody,
  CustomTableCell,
  CustomTableHead,
  CustomTableHeader,
  CustomTableRow,
} from "@/components/dashboard/CustomDataTable";
import TotalStatCard from "@/components/dashboard/TotalStatCard";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Anchor } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Order {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: string;
  status: "Completed" | "Processing" | "Pending" | "Cancelled";
}

const orders: Order[] = Array.from({ length: 23 }, (_, i) => ({
  id: `ORD-${(i + 1).toString().padStart(3, "0")}`,
  customer: i % 2 === 0 ? "Tarikul Abir" : "Admin",
  date: "03-05-2025",
  items: 4,
  total: "$12,999",
  status: ["Completed", "Processing", "Pending", "Cancelled"][
    i % 4
  ] as Order["status"],
}));

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-600";
    case "Processing":
      return "bg-purple-100 text-purple-600";
    case "Pending":
      return "bg-yellow-100 text-yellow-600";
    case "Cancelled":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container">
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h1 className="font-semibold text-3xl">Orders</h1>
          <p className="font-medium text-gray-500 text-base">
            Manage your orders right from here
          </p>
        </div>
        <Button
          variant="outline"
          className="cursor-pointer border px-4 py-2 rounded shadow text-sm flex items-center"
        >
          <Anchor className="mr-2" size={15} />
          Export
        </Button>
      </div>

      <div className="flex justify-between gap-2 mb-4">
        <TotalStatCard
          total={orders.length}
          growthPercentage={1.3}
          icon="/order.svg"
          title="Total Orders"
        />
        <TotalStatCard
          total={orders.filter((o) => o.status === "Processing").length}
          growthPercentage={1.1}
          icon="/proccessing.svg"
          title="Proccessing"
        />
        <TotalStatCard
          total={120}
          growthPercentage={-1.3}
          icon="/shipping.svg"
          title="Shipped"
        />
        <TotalStatCard
          total={11200}
          growthPercentage={3.2}
          icon="/dollar.svg"
          title="Revenue"
        />
      </div>

      <div className="pt-4">
        <div className="flex flex-col mb-4">
          <h1 className="font-semibold text-2xl">Recent Orders</h1>
          <p className="font-medium text-gray-500 text-base">
            Manage and review your recent orders
          </p>
        </div>
        <CustomTable>
          <CustomTableHeader>
            <CustomTableRow>
              <CustomTableHead>Order ID</CustomTableHead>
              <CustomTableHead>Customer</CustomTableHead>
              <CustomTableHead>Date</CustomTableHead>
              <CustomTableHead>Items</CustomTableHead>
              <CustomTableHead>Total</CustomTableHead>
              <CustomTableHead>Status</CustomTableHead>
              <CustomTableHead>Actions</CustomTableHead>
            </CustomTableRow>
          </CustomTableHeader>
          <CustomTableBody>
            {paginatedOrders.map((order) => (
              <CustomTableRow key={order.id} variant="striped">
                <CustomTableCell>{order.id}</CustomTableCell>
                <CustomTableCell>{order.customer}</CustomTableCell>
                <CustomTableCell>{order.date}</CustomTableCell>
                <CustomTableCell>{order.items}</CustomTableCell>
                <CustomTableCell>{order.total}</CustomTableCell>
                <CustomTableCell>
                  <span
                    className={`${getStatusColor(
                      order.status
                    )} px-3 py-1 text-sm rounded-4xl font-semibold capitalize`}
                  >
                    {order.status}
                  </span>
                </CustomTableCell>
                <CustomTableCell>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <Eye className="w-4 h-4 text-gray-600 hover:text-blue-600 cursor-pointer" />
                    </Link>
                    <Trash2 className="w-4 h-4 text-red-400 hover:text-red-600 cursor-pointer" />
                  </div>
                </CustomTableCell>
              </CustomTableRow>
            ))}
          </CustomTableBody>
        </CustomTable>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          className="px-3 py-1 text-sm border rounded"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 text-sm border rounded ${
              currentPage === i + 1
                ? "bg-gray-900 font-semibold text-white"
                : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 text-sm border rounded"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
