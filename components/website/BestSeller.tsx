// components/BestSellers.jsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "AirPods Max",
    price: "$234",
    image: "/website/bestselling-1.jpg",
    href: "/products/airpods-max",
  },
  {
    id: 2,
    name: "Anker 30W Adapter",
    price: "$234",
    image: "/website/bestselling-1.jpg",
    href: "/products/anker-adapter",
  },
  {
    id: 3,
    name: 'Redmi 23.8" Monitor',
    price: "$234",
    image: "/website/bestselling-1.jpg",
    href: "/products/redmi-monitor",
  },
  {
    id: 4,
    name: "Smart Watch Pro",
    price: "$199",
    image: "/website/bestselling-1.jpg",
    href: "/products/smart-watch",
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    price: "$129",
    image: "/website/bestselling-1.jpg",
    href: "/products/wireless-earbuds",
  },
  {
    id: 6,
    name: "Portable Charger",
    price: "$79",
    image: "/website/bestselling-1.jpg",
    href: "/products/portable-charger",
  },
];

const BestSellers = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const visibleProducts = [];
  for (let i = 0; i < itemsPerPage; i++) {
    const index = (currentPage * itemsPerPage + i) % products.length;
    visibleProducts.push(products[index]);
  }

  const goToPage = (pageIndex: any) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div className="w-full py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Best Sellers.</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevPage}
              className="rounded-full h-10 w-10 border-gray-200 hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              className="rounded-full h-10 w-10 border-gray-200 hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleProducts.map((product) => (
            <Link key={product.id} href={product.href}>
              <Card className="overflow-hidden border border-gray-100 h-full transition-all duration-300 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-6 h-52">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <p className="mt-2 font-medium text-gray-800">
                      {product.price}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`h-2 rounded-full transition-all ${
                currentPage === i ? "w-8 bg-gray-800" : "w-2 bg-gray-300"
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
