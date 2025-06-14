"use client";
import CategoryDistributionChart from "@/components/dashboard/BarChart";
import {
  CustomTable,
  CustomTableBody,
  CustomTableCell,
  CustomTableHead,
  CustomTableHeader,
  CustomTableRow,
} from "@/components/dashboard/CustomDataTable";
import SalesChart from "@/components/dashboard/SalesChart";
import TotalStatCard from "@/components/dashboard/TotalStatCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const orders = [
  {
    id: "ORD001",
    customer: "John Doe",
    admin: "Alice Smith",
    date: "2025-05-10",
    items: 3,
    total: "$150.00",
    status: "completed",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-600";
    case "processing":
      return "bg-purple-100 text-purple-600";
    case "pending":
      return "bg-orange-100 text-orange-500";
    case "cancel":
      return "bg-red-100 text-red-500";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Page = () => {
  const [activeTab, setActiveTab] = useState("all orders");
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    ordersThisMonth: 0,
    ordersThisWeek: 0,
    ordersToday: 0,
  });

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all orders") return true;
    return order.status === activeTab;
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "/api/proxy/dashboard/stats"
        );
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="container">
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h1 className="font-semibold text-3xl">Amazon Dashboard</h1>
          <p className="font-medium text-gray-500 text-base">
            Manage your product inventory
          </p>
        </div>
      </div>

      <div className="flex justify-between gap-2 mb-4">
        <TotalStatCard
          total={stats.totalProducts}
          growthPercentage={1.3}
          icon="/product.svg"
          title="total product"
          href="/dashboard/amazon/products"
        />
        <TotalStatCard
          total={stats.ordersThisMonth}
          growthPercentage={2.1}
          icon="/instock.svg"
          title="orders this month"
          href="/dashboard/amazon/orders"
        />
        <TotalStatCard
          total={stats.ordersThisWeek}
          growthPercentage={0.5}
          icon="/lowstock.svg"
          title="orders this week"
          href="/dashboard/amazon/orders"
        />
        <TotalStatCard
          total={stats.ordersToday}
          growthPercentage={0.2}
          icon="/outofstock.svg"
          title="orders today"
          href="/dashboard/amazon/orders"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <SalesChart />
        <CategoryDistributionChart />
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-4"
      >
        <TabsList className="bg-gray-100">
          <TabsTrigger
            value="all orders"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            All Orders
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            value="processing"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Processing
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="cancel"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Cancel
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <CustomTable>
        <CustomTableHeader>
          <CustomTableRow>
            <CustomTableHead>Order ID</CustomTableHead>
            <CustomTableHead>Customer</CustomTableHead>
            <CustomTableHead>Admin</CustomTableHead>
            <CustomTableHead>Date</CustomTableHead>
            <CustomTableHead>Items</CustomTableHead>
            <CustomTableHead>Total</CustomTableHead>
            <CustomTableHead>Status</CustomTableHead>
            <CustomTableHead>Action</CustomTableHead>
          </CustomTableRow>
        </CustomTableHeader>
        <CustomTableBody>
          {filteredOrders.map((order) => (
            <CustomTableRow key={order.id} variant="striped">
              <CustomTableCell>{order.id}</CustomTableCell>
              <CustomTableCell>{order.customer}</CustomTableCell>
              <CustomTableCell>{order.admin}</CustomTableCell>
              <CustomTableCell>{order.date}</CustomTableCell>
              <CustomTableCell>{order.items}</CustomTableCell>
              <CustomTableCell>{order.total}</CustomTableCell>
              <CustomTableCell className="capitalize">
                <span
                  className={`${getStatusColor(
                    order.status
                  )} px-3 rounded-4xl py-1 font-semibold`}
                >
                  {order.status}
                </span>
              </CustomTableCell>
              <CustomTableCell>
                <div className="flex justify-center gap-2">
                  <span className="cursor-pointer">
                    <Eye width={16} />
                  </span>
                  <span className="cursor-pointer">
                    <Trash2 width={16} className="text-red-400" />
                  </span>
                </div>
              </CustomTableCell>
            </CustomTableRow>
          ))}
        </CustomTableBody>
      </CustomTable>

      {filteredOrders.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found for the selected filter.
        </div>
      )}
    </div>
  );
};

export default Page;
