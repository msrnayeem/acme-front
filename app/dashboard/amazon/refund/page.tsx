"use client";
import {
  CustomTable,
  CustomTableBody,
  CustomTableCell,
  CustomTableHead,
  CustomTableHeader,
  CustomTableRow,
} from "@/components/dashboard/CustomDataTable";
import { RefundDetailsModal } from "@/components/dashboard/RefundDetailsModal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye } from "lucide-react";
import { useState } from "react";

// Dummy product data
const refundRequests = [
  {
    id: "RR001",
    orderId: "ORD12345",
    customer: "John Doe",
    date: "2025-05-10",
    amount: "$89.99",
    status: "completed",
  },
  {
    id: "RR002",
    orderId: "ORD12346",
    customer: "Jane Smith",
    date: "2025-05-09",
    amount: "$59.49",
    status: "pending",
  },
  {
    id: "RR003",
    orderId: "ORD12347",
    customer: "Alice Johnson",
    date: "2025-05-08",
    amount: "$35.00",
    status: "completed",
  },
  {
    id: "RR004",
    orderId: "ORD12348",
    customer: "Bob Brown",
    date: "2025-05-07",
    amount: "$129.99",
    status: "rejected",
  },
  {
    id: "RR005",
    orderId: "ORD12349",
    customer: "Emily Davis",
    date: "2025-05-06",
    amount: "$45.25",
    status: "pending",
  },
];

// ✅ Color utility
const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-orange-100 text-orange-500";
    case "rejected":
      return "bg-red-100 text-red-500";
    case "completed":
      return "bg-green-100 text-green-500";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Page = () => {
  const [activeTab, setActiveTab] = useState("all");

  // ✅ Filter by tab status
  const filteredRefunds = refundRequests.filter((refund) =>
    activeTab === "all" ? true : refund.status === activeTab
  );

  return (
    <div className="container">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h1 className="font-semibold text-3xl">Amazon Refund Requests</h1>
          <p className="font-medium text-gray-500 text-base">
            Manage your product inventory
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-4"
      >
        <TabsList className="bg-gray-100">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Rejected
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Table */}
      <CustomTable>
        <CustomTableHeader>
          <CustomTableRow>
            <CustomTableHead>Refund ID</CustomTableHead>
            <CustomTableHead>Order Id</CustomTableHead>
            <CustomTableHead>Customer</CustomTableHead>
            <CustomTableHead>Date</CustomTableHead>
            <CustomTableHead>Amount</CustomTableHead>
            <CustomTableHead>Status</CustomTableHead>
            <CustomTableHead>Action</CustomTableHead>
          </CustomTableRow>
        </CustomTableHeader>
        <CustomTableBody>
          {filteredRefunds.map((item) => (
            <CustomTableRow key={item.id} variant="striped">
              <CustomTableCell>{item.id}</CustomTableCell>
              <CustomTableCell>{item.orderId}</CustomTableCell>
              <CustomTableCell>{item.customer}</CustomTableCell>
              <CustomTableCell>{item.date}</CustomTableCell>
              <CustomTableCell>{item.amount}</CustomTableCell>
              <CustomTableCell className="capitalize">
                <span
                  className={`${getStatusColor(
                    item.status
                  )} px-3 rounded-4xl py-1 font-semibold`}
                >
                  {item.status}
                </span>
              </CustomTableCell>
              <CustomTableCell>
                <RefundDetailsModal
                  refund={{
                    id: item.id,
                    date: item.date,
                    amount: item.amount,
                    method: "Credit Card",
                    reason: "Item arrived damaged",
                    notes:
                      "Customer received damaged packaging, full refund issued",
                    orderId: item.orderId,
                    customer: item.customer,
                    email: "SmithA@gmail.com",
                    status: item.status,
                    products: [
                      { product: "Iphone 13 Pro Max", quantity: 1, price: 999 },
                      { product: "Macbook Air M4", quantity: 1, price: 999 },
                    ],
                  }}
                  trigger={
                    <span className="cursor-pointer flex justify-center">
                      <Eye width={16} />
                    </span>
                  }
                />
              </CustomTableCell>
            </CustomTableRow>
          ))}
        </CustomTableBody>
      </CustomTable>

      {/* No data fallback */}
      {filteredRefunds.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No refund requests found for the selected filter.
        </div>
      )}
    </div>
  );
};

export default Page;
