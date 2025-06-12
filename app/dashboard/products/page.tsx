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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Dummy product data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$89.99",
    stock: 120,
    status: "in stock",
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Sportswear",
    price: "$59.49",
    stock: 80,
    status: "in stock",
  },
  {
    id: 3,
    name: "Coffee Maker",
    category: "Home Appliance",
    price: "$35.00",
    stock: 60,
    status: "in stock",
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Gadgets",
    price: "$129.99",
    stock: 30,
    status: "low stock",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    category: "Audio",
    price: "$45.25",
    stock: 10,
    status: "low stock",
  },
  {
    id: 6,
    name: "Wireless Earbuds",
    category: "Audio",
    price: "$45.25",
    stock: 0,
    status: "out of stock",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "low stock":
      return "bg-orange-100 text-orange-500";
    case "out of stock":
      return "bg-red-100 text-red-500";
    case "in stock":
      return "bg-green-100 text-green-500";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Page = () => {
  const [activeTab, setActiveTab] = useState("all products");

  // Filter products based on the active tab
  const filteredProducts = products.filter((product) => {
    if (activeTab === "all products") return true;
    return product.status === activeTab;
  });

  // Calculate stats for each category and showing them in totalStatCard
  const inStockCount = products.filter((p) => p.status === "in stock").length;
  const lowStockCount = products.filter((p) => p.status === "low stock").length;
  const outOfStockCount = products.filter(
    (p) => p.status === "out of stock"
  ).length;

  return (
    <div className="container">
      {/* product */}
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h1 className="font-semibold text-3xl">Product</h1>
          <p className="font-medium text-gray-500 text-base">
            Manage your product inventory
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
          growthPercentage={1.3}
          icon="/product.svg"
          title="total product"
        />
        <TotalStatCard
          total={inStockCount}
          growthPercentage={1.3}
          icon="/instock.svg"
          title="in stock"
        />
        <TotalStatCard
          total={lowStockCount}
          growthPercentage={1.3}
          icon="/lowstock.svg"
          title="low stock"
        />
        <TotalStatCard
          total={outOfStockCount}
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
            value="all products"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            All Products
          </TabsTrigger>
          <TabsTrigger
            value="in stock"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            In Stock
          </TabsTrigger>
          <TabsTrigger
            value="low stock"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Low Stock
          </TabsTrigger>
          <TabsTrigger
            value="out of stock"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Out of Stock
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <CustomTable>
        <CustomTableHeader>
          <CustomTableRow>
            <CustomTableHead>ID</CustomTableHead>
            <CustomTableHead>Product Name</CustomTableHead>
            <CustomTableHead>Category</CustomTableHead>
            <CustomTableHead>Price</CustomTableHead>
            <CustomTableHead>Stock</CustomTableHead>
            <CustomTableHead>Status</CustomTableHead>
            <CustomTableHead>Action</CustomTableHead>
          </CustomTableRow>
        </CustomTableHeader>
        <CustomTableBody>
          {filteredProducts.map((product) => (
            <CustomTableRow key={product.id} variant="striped">
              <CustomTableCell>{product.id}</CustomTableCell>
              <CustomTableCell>{product.name}</CustomTableCell>
              <CustomTableCell>{product.category}</CustomTableCell>
              <CustomTableCell>{product.price}</CustomTableCell>
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
                <div className="flex justify-between">
                  <span className="cursor-pointer">
                    <Eye width={16} />
                  </span>
                  <span className="cursor-pointer">
                    <Pencil width={16} />
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
      {filteredProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found for the selected filter.
        </div>
      )}
    </div>
  );
};

export default Page;
