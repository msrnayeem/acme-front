// components/CuratedElectronic.jsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const productData = [
  {
    id: 1,
    title: "Lightweight luxury earphones",
    description: "Lorem ipsum dolor sit amet consectetur.",
    image: "/website/headphone-1.jpg",
    link: "/products/earphones",
  },
  {
    id: 2,
    title: "Upgrade your listening experience",
    description: "Lorem ipsum dolor sit amet consectetur.",
    image: "/website/headphone-2.jpg",
    link: "/products/headphones",
  },
  {
    id: 3,
    title: "Discover exclusive collaborations",
    description: "Lorem ipsum dolor sit amet consectetur.",
    image: "/website/headphone-3.png",
    link: "/collections/exclusive",
  },
];

const CuratedElectronic = () => {
  return (
    <div className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">
            Curated Electronic
            <br />
            Ensemble.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productData.map((product) => (
            <Link key={product.id} href={product.link}>
              <Card>
                <CardContent>
                  <div className="flex flex-col justify-between">
                    <div className="p-6">
                      <h3 className="font-medium text-lg mb-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {product.description}
                      </p>
                    </div>
                    <div className="">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={200}
                        height={300}
                        className="w-full object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CuratedElectronic;
