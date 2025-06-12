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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  CreditCard,
  Eye,
  Hash,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Dummy product data
const products = [
  {
    id: 1,
    name: "Alex hales",
    category: "Card",
    price: "$89.99",
    stock: "03-05-2025",
    status: "successful",
  },
  {
    id: 2,
    name: "Dummy alex",
    category: "Card",
    price: "$59.49",
    stock: "03-05-2025",
    status: "pending",
  },
  {
    id: 3,
    name: "Younus Maker",
    category: "Card",
    price: "$35.00",
    stock: "03-05-2025",
    status: "failed",
  },
  {
    id: 4,
    name: "Smart Faisol",
    category: "Card",
    price: "$129.99",
    stock: "03-05-2025",
    status: "successful",
  },
  {
    id: 5,
    name: "Bluetooth Jobaar",
    category: "Card",
    price: "$45.25",
    stock: "03-05-2025",
    status: "pending",
  },
  {
    id: 6,
    name: "Wireless Toko",
    category: "Card",
    price: "$45.25",
    stock: "03-05-2025",
    status: "failed",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-orange-100 text-orange-500";
    case "failed":
      return "bg-red-100 text-red-500";
    case "successful":
      return "bg-green-100 text-green-500";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Page = () => {
  const [activeTab, setActiveTab] = useState("all payment");
  //   const [open, setOpen] = useState(false);
  // Filter products based on the active tab
  const filteredProducts = products.filter((product) => {
    if (activeTab === "all payment") return true;
    return product.status === activeTab;
  });

  // Calculate stats for each category and showing them in totalStatCard
  const successCount = products.filter((p) => p.status === "successful").length;
  const failedCount = products.filter((p) => p.status === "failed").length;
  const pendingCount = products.filter((p) => p.status === "pending").length;

  return (
    <div className="container">
      {/* product */}
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h1 className="font-semibold text-3xl">Payments</h1>
          <p className="font-medium text-gray-500 text-base">
            Manage your payment transactions
          </p>
        </div>
        <Link href="/dashboard/products/create">
          <Button>Add Product</Button>
        </Link>
      </div>

      {/* TotalStat */}
      <div className="flex justify-between gap-2 mb-4">
        <TotalStatCard
          total={products.length}
          growthPercentage={-1.3}
          icon="/dollar.svg"
          title="total revenue"
        />
        <TotalStatCard
          total={successCount}
          growthPercentage={1.3}
          icon="/instock.svg"
          title="successful"
        />
        <TotalStatCard
          total={pendingCount}
          growthPercentage={1.3}
          icon="/proccessing.svg"
          title="pending"
        />
        <TotalStatCard
          total={failedCount}
          growthPercentage={-1.3}
          icon="/outofstock.svg"
          title="out of stock"
        />
      </div>

      {/* Table with Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-4"
      >
        <TabsList className="bg-gray-100">
          <TabsTrigger
            value="all payment"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            All Payments
          </TabsTrigger>
          <TabsTrigger
            value="successful"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Successful
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="failed"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Failed
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <CustomTable>
        <CustomTableHeader>
          <CustomTableRow>
            <CustomTableHead>Invoice ID</CustomTableHead>
            <CustomTableHead>Customer</CustomTableHead>
            <CustomTableHead>Amount</CustomTableHead>
            <CustomTableHead>Payment Method </CustomTableHead>
            <CustomTableHead>Date</CustomTableHead>
            <CustomTableHead>Status</CustomTableHead>
            <CustomTableHead>Action</CustomTableHead>
          </CustomTableRow>
        </CustomTableHeader>
        <CustomTableBody>
          {filteredProducts.map((product) => (
            <CustomTableRow key={product.id} variant="striped">
              <CustomTableCell>{product.id}</CustomTableCell>
              <CustomTableCell>{product.name}</CustomTableCell>
              <CustomTableCell>{product.price}</CustomTableCell>
              <CustomTableCell>{product.category}</CustomTableCell>
              <CustomTableCell>{product.stock}</CustomTableCell>
              <CustomTableCell className="capitalize">
                <span
                  className={`${getStatusColor(
                    product.status
                  )} px-3 rounded-4xl py-1 font-semibold`}
                >
                  {product.status}
                </span>
              </CustomTableCell>
              {/* Action Buttons */}
              <CustomTableCell>
                <Dialog>
                  <DialogTrigger>
                    <Eye size={16} />
                  </DialogTrigger>
                  <DialogContent className="min-w-3xl">
                    {/* <DialogHeader> */}
                    {/* <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader> */}
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="flex justify-between items-center">
                        <div>
                          <DialogTitle>Payment Details</DialogTitle>
                          <DialogDescription>
                            Complete information about payment INV-001
                          </DialogDescription>
                          <div className="mt-2">
                            <h3 className="text-lg font-semibold">INV-001</h3>
                            <p className="text-sm text-gray-500">
                              03-05-2025 | 09:06:23
                            </p>
                          </div>
                        </div>
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                          Pending
                        </span>
                      </div>

                      {/* Info Cards */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Payment Info */}
                        <div className="border rounded-lg p-4 space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">
                            PAYMENT INFORMATION
                          </h4>
                          <p className="flex items-center gap-2 text-sm">
                            <CreditCard size={20} /> <b>Method:</b> Credit Card
                          </p>
                          <p className="flex items-center gap-2 text-sm">
                            <Calendar size={20} /> <b>Date:</b> 03-05-2025
                          </p>
                          <p className="flex items-center gap-2 text-sm">
                            <Clock size={20} /> <b>Time:</b> 09:06 PM
                          </p>
                          <p className="flex items-center gap-2 text-sm">
                            <Hash size={20} /> <b>Transaction ID :</b>{" "}
                            TXN-987654321
                          </p>
                        </div>

                        {/* Customer Info */}
                        <div className="border rounded-lg p-4 space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">
                            CUSTOMER DETAILS
                          </h4>
                          <p className="flex items-center gap-2 text-sm">
                            <User size={20} /> <b>Name:</b> Tarikul Abir
                          </p>
                          <p className="flex items-center gap-2 text-sm">
                            <MapPin size={20} /> <b>Address:</b> 123 Main St,
                            New York, NY 10001
                          </p>
                          <p className="flex items-center gap-2 text-sm">
                            <Mail size={20} /> <b>Email:</b>{" "}
                            tarikulabir@gmail.com
                          </p>
                          <p className="flex items-center gap-2 text-sm">
                            <Phone size={20} /> <b>Phone:</b> +880 123838435
                          </p>
                        </div>
                      </div>

                      {/* Purchased Items */}
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium text-sm mb-2">
                          PURCHASED ITEMS
                        </h4>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left border-b">
                              <th className="pb-2">Product</th>
                              <th className="pb-2">Quantity</th>
                              <th className="pb-2">Price</th>
                              <th className="pb-2">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2">iPhone 13 Pro Max</td>
                              <td>1</td>
                              <td>$999</td>
                              <td>$999</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">Macbook Air M4</td>
                              <td>1</td>
                              <td>$999</td>
                              <td>$999</td>
                            </tr>
                            <tr>
                              <td
                                colSpan={3}
                                className="text-right font-semibold py-2"
                              >
                                Subtotal
                              </td>
                              <td>$1,998</td>
                            </tr>
                            <tr>
                              <td
                                colSpan={3}
                                className="text-right font-semibold py-1"
                              >
                                Total Due
                              </td>
                              <td>$1,998</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CustomTableCell>
            </CustomTableRow>
          ))}
        </CustomTableBody>
      </CustomTable>
      {filteredProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found for the selected filter.
        </div>
      )}
    </div>
  );
};

export default Page;
