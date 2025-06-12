// components/ShopByCategory.jsx
"use client";

import {
  Cable,
  Headphones,
  Monitor,
  Mouse,
  Smartphone,
  Watch,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Cables",
    icon: Cable,
    href: "/category/cables",
  },
  {
    id: 2,
    name: "Headphones",
    icon: Headphones,
    href: "/category/headphones",
  },
  {
    id: 3,
    name: "Monitors",
    icon: Monitor,
    href: "/category/monitors",
  },
  {
    id: 4,
    name: "Mobile Phones",
    icon: Smartphone,
    href: "/category/mobile-phones",
  },
  {
    id: 5,
    name: "Mouses",
    icon: Mouse,
    href: "/category/mouses",
  },
  {
    id: 6,
    name: "Smart Watches",
    icon: Watch,
    href: "/category/smart-watches",
  },
];

const ShopByCategory = () => {
  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Shop by Category.</h2>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="flex flex-col items-center justify-center p-4 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <category.icon className="w-6 h-6" />
                </div>
                <span className="mt-2 text-xs text-center">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
