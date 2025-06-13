"use client";
import Link from "next/link";
import {
  CustomTable,
  CustomTableBody,
  CustomTableCell,
  CustomTableHead,
  CustomTableHeader,
  CustomTableRow,
} from "@/components/dashboard/CustomDataTable";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

// Color utility for order status
const getOrderStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-orange-100 text-orange-500";
    case "canceled":
      return "bg-red-100 text-red-500";
    case "shipped":
      return "bg-green-100 text-green-500";
    case "unshipped":
      return "bg-yellow-100 text-yellow-700";
    case "partiallyshipped":
      return "bg-blue-100 text-blue-500";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const statusTabs = [
  { value: "all", label: "All" },
  { value: "Shipped", label: "Shipped" },
  { value: "Unshipped", label: "Unshipped" },
  { value: "Canceled", label: "Canceled" },
];

type Order = {
  AmazonOrderId: string;
  PurchaseDate: string;
  OrderStatus: string;
  OrderTotal?: {
    CurrencyCode: string;
    Amount: string;
  };
  BuyerInfo?: {
    BuyerEmail?: string;
  };
  NumberOfItemsShipped?: number;
  NumberOfItemsUnshipped?: number;
  SalesChannel?: string;
  ShippingAddress?: {
    City?: string;
    StateOrRegion?: string;
    PostalCode?: string;
    CountryCode?: string;
    CompanyName?: string;
  };
};

const Page = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  // Fetch orders from proxy API
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/proxy/orders");
        if (res.data?.success && res.data?.data?.payload?.Orders) {
          setOrders(res.data.data.payload.Orders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Filter orders by selected tab and search query
  const filteredOrders = orders.filter((order) => {
    // Tab filter
    let tabMatch = true;
    if (activeTab !== "all") {
      if (activeTab.toLowerCase() === "shipped") {
        tabMatch =
          order.OrderStatus?.toLowerCase() === "shipped" ||
          order.OrderStatus?.toLowerCase() === "partiallyshipped";
      } else {
        tabMatch = order.OrderStatus?.toLowerCase() === activeTab.toLowerCase();
      }
    }

    // Search filter (search in OrderId, BuyerEmail, Status, Amount, etc.)
    let searchMatch = true;
    if (search.trim() !== "") {
      const q = search.toLowerCase();
      searchMatch =
        order.AmazonOrderId.toLowerCase().includes(q) ||
        (order.BuyerInfo?.BuyerEmail?.toLowerCase() || "").includes(q) ||
        (order.OrderStatus?.toLowerCase() || "").includes(q) ||
        (order.OrderTotal?.Amount?.toLowerCase() || "").includes(q) ||
        (order.OrderTotal?.CurrencyCode?.toLowerCase() || "").includes(q) ||
        (order.PurchaseDate ? new Date(order.PurchaseDate).toLocaleString().toLowerCase() : "").includes(q);
    }

    return tabMatch && searchMatch;
  });

  return (
    <div className="container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div>
          <h1 className="font-semibold text-3xl">Amazon Orders</h1>
          <p className="font-medium text-gray-500 text-base">
            Manage your Amazon store orders
          </p>
        </div>
        <div className="w-full sm:w-80">
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-100 text-sm"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-4"
      >
        <TabsList className="bg-gray-100">
          {statusTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-black data-[state=active]:text-white capitalize"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Table */}
      <CustomTable>
        <CustomTableHeader>
          <CustomTableRow>
            <CustomTableHead>Sl</CustomTableHead>
            <CustomTableHead>Order ID</CustomTableHead>
            <CustomTableHead>Buyer Email</CustomTableHead>
            <CustomTableHead>Order Date</CustomTableHead>
            <CustomTableHead>Status</CustomTableHead>
            <CustomTableHead>Amount</CustomTableHead>
            <CustomTableHead>Shipped/Unshipped</CustomTableHead>
            <CustomTableHead>Action</CustomTableHead>
          </CustomTableRow>
        </CustomTableHeader>
        <CustomTableBody>
          {loading ? (
            <CustomTableRow>
              <CustomTableCell colSpan={8}>
                <div className="text-center py-8 text-gray-500">
                  Loading orders...
                </div>
              </CustomTableCell>
            </CustomTableRow>
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((order, idx) => (
              <CustomTableRow key={order.AmazonOrderId} variant="striped">
                <CustomTableCell>{idx + 1}</CustomTableCell>
                <CustomTableCell>
                  <Link
                    href={`/dashboard/amazon/orders/${order.AmazonOrderId}`}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    {order.AmazonOrderId}
                  </Link>
                </CustomTableCell>
                <CustomTableCell>
                  {order.BuyerInfo?.BuyerEmail || "-"}
                </CustomTableCell>
                <CustomTableCell>
                  {order.PurchaseDate
                    ? new Date(order.PurchaseDate).toLocaleString()
                    : "-"}
                </CustomTableCell>
                <CustomTableCell className="capitalize">
                  <span
                    className={`${getOrderStatusColor(
                      order.OrderStatus
                    )} px-3 rounded-4xl py-1 font-semibold`}
                  >
                    {order.OrderStatus || "-"}
                  </span>
                </CustomTableCell>
                <CustomTableCell>
                  {order.OrderTotal
                    ? `${order.OrderTotal.CurrencyCode} ${order.OrderTotal.Amount}`
                    : "-"}
                </CustomTableCell>
                <CustomTableCell>
                  {order.NumberOfItemsShipped ?? 0} /{" "}
                  {order.NumberOfItemsUnshipped ?? 0}
                </CustomTableCell>
                <CustomTableCell>
                  <Link
                    href={`/dashboard/amazon/orders/${order.AmazonOrderId}`}
                    className="flex justify-center items-center text-gray-600 hover:text-blue-600"
                    title="View"
                  >
                    <Eye width={16} />
                  </Link>
                </CustomTableCell>
              </CustomTableRow>
            ))
          ) : (
            <CustomTableRow>
              <CustomTableCell colSpan={8}>
                <div className="text-center py-8 text-gray-500">
                  No orders found for the selected filter.
                </div>
              </CustomTableCell>
            </CustomTableRow>
          )}
        </CustomTableBody>
      </CustomTable>
    </div>
  );
};

export default Page;