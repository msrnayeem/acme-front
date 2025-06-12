"use client";

import {
  CustomTable,
  CustomTableBody,
  CustomTableCell,
  CustomTableHead,
  CustomTableHeader,
  CustomTableRow,
} from "@/components/dashboard/CustomDataTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [prevTokens, setPrevTokens] = useState<string[]>([]);

  const fetchProducts = async (token?: string, isPrevious: boolean = false) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ limit: "20" });
      if (token) {
        params.append("nextToken", token);
      }

      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/amazon/products?${params.toString()}`, {
        headers: { 'Cache-Control': 'no-cache' },
      });


      const items = res.data?.data?.items || [];
      const newNextToken = res.data?.data?.pagination?.nextToken || null;

      const parsed = items.map((item: any, index: number) => {
        const attr = item.attributes || {};
        const name = attr.item_name?.[0]?.value || item.sku;
        // Always try to get "our price" from purchasable_offer
        let price: any = undefined;
        if (
          attr.purchasable_offer?.[0]?.our_price?.[0]?.schedule?.[0]?.value_with_tax !== undefined
        ) {
          price = attr.purchasable_offer[0].our_price[0].schedule[0].value_with_tax;
        } else if (
          item.offers?.[0]?.price?.amount !== undefined
        ) {
          price = item.offers[0].price.amount;
        } else {
          price = undefined;
        }
        const stock = attr.fulfillment_availability?.[0]?.quantity || 0;
        const category = attr.item_type_keyword?.[0]?.value || "unknown";
        const asin = item.summaries?.[0]?.asin || '';

        return {
          id: (currentPage - 1) * 5 + index + 1,
          asin,
          name,
          price: price !== undefined ? `$${price}` : "-",
          stock,
          category,
          sku: item.sku,
        };
      });

      setProducts([...parsed]);
      setNextToken(newNextToken);
      if (!isPrevious && token) {
        setPrevTokens((prev) => [...prev, token]);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const handleNextPage = () => {
    if (nextToken) {
      setCurrentPage((prev) => prev + 1);
      fetchProducts(nextToken);
    }
  };

  const handlePrevPage = () => {
    if (prevTokens.length > 0) {
      const lastToken = prevTokens[prevTokens.length - 1];
      setPrevTokens((prev) => prev.slice(0, -1));
      setCurrentPage((prev) => prev - 1);
      fetchProducts(lastToken, true);
    } else if (currentPage > 1) {
      setCurrentPage(1);
      setNextToken(null);
      fetchProducts();
    }
  };

  const filteredProducts = products.filter((product) => {
    if (activeTab === "all products") return true;
    return product.status === activeTab;
  });

  return (
    <div className="container">
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h1 className="font-semibold text-3xl">Amazon Product</h1>
          <p className="font-medium text-gray-500 text-base">
            Manage your product inventory
          </p>
        </div>
        <Link href="/dashboard/amazon/products/create">
          <Button>Add Product</Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-4">
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
            <CustomTableHead>Price</CustomTableHead>
            <CustomTableHead>Stock</CustomTableHead>
            <CustomTableHead>SKU</CustomTableHead>
            <CustomTableHead>Action</CustomTableHead>
          </CustomTableRow>
        </CustomTableHeader>
        <CustomTableBody>
          {filteredProducts.map((product) => (
            <CustomTableRow key={product.id} variant="striped">
              <CustomTableCell>{product.id}</CustomTableCell>
              <CustomTableCell>{product.name}</CustomTableCell>
              <CustomTableCell>{product.price}</CustomTableCell>
              <CustomTableCell>{product.stock}</CustomTableCell>
              <CustomTableCell>{product.sku}</CustomTableCell>
              <CustomTableCell>
                <div className="flex justify-between gap-x-2">
                  <Link href={`/dashboard/amazon/products/${product.asin}`}>
                    <Eye width={16} className="cursor-pointer" />
                  </Link>
                  <Link href={`/dashboard/amazon/products/edit/${product.sku}`}>
                    <Pencil width={16} className="cursor-pointer" />
                  </Link>
                  <span className="cursor-pointer">
                    <Trash2 width={16} className="text-red-400" />
                  </span>
                </div>
              </CustomTableCell>
            </CustomTableRow>
          ))}
        </CustomTableBody>
      </CustomTable>

      {loading && (
        <div className="text-center py-8 text-gray-500">Loading products...</div>
      )}
      {!loading && products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products available. Please check the API or try again later.
        </div>
      )}
      {!loading && products.length > 0 && filteredProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found for the selected filter.
        </div>
      )}

      <div className="flex justify-between mt-4">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          variant="outline"
        >
          Previous
        </Button>
        <span>Page {currentPage}</span>
        <Button
          onClick={handleNextPage}
          disabled={!nextToken}
          variant="outline"
        >
          Next
        </Button>
        <Button
          onClick={() => {
            setCurrentPage(1);
            setPrevTokens([]);
            setNextToken(null);
            fetchProducts();
          }}
          variant="outline"
        >
          Reset Pagination
        </Button>
      </div>
    </div>
  );
};

export default Page;