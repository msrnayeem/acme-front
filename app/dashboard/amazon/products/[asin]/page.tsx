"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AmazonProductDetail {
  asin: string;
  attributes: any;
  identifiers: any[];
  images: any[];
  summaries: any[];
}

const formatDimensions = (dims: any) => {
  if (!dims) return "-";
  return `${dims.length?.value} x ${dims.width?.value} x ${dims.height?.value} ${dims.length?.unit || ""}`;
};

const formatIdentifiers = (attrs: any) => {
  const upc = attrs?.externally_assigned_product_identifier?.find((id: any) => id.type === "upc")?.value;
  const ean = attrs?.externally_assigned_product_identifier?.find((id: any) => id.type === "ean")?.value;
  const gtin = attrs?.externally_assigned_product_identifier?.find((id: any) => id.type === "gtin")?.value;
  return (
    <>
      {upc && <span className="mr-2">UPC: {upc}</span>}
      {ean && <span className="mr-2">EAN: {ean}</span>}
      {gtin && <span>GTIN: {gtin}</span>}
    </>
  );
};

const ProductDetailPage = () => {
  const params = useParams();
  const asin = params?.asin as string;

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<AmazonProductDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  // New: Main image index state
  const [mainImageIdx, setMainImageIdx] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/amazon/products/asin/${asin}`,
          { headers: { "Cache-Control": "no-cache" } }
        );

        if (res.data?.success && res.data?.data) {
          setProduct(res.data.data);
        } else {
          setError("Product not found");
        }
      } catch (err: any) {
        setError("Failed to load product details");
      }
      setLoading(false);
    };
    if (asin) fetchProduct();
  }, [asin]);

  // Reset main image if product/asin changes
  useEffect(() => {
    setMainImageIdx(0);
  }, [asin, product]);

  if (loading) {
    return (
      <div className="container py-12 text-center text-gray-500">
        Loading product details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-12 text-center text-red-500">
        {error || "Product not found"}
      </div>
    );
  }

  const { attributes, images } = product;
  const galleryImages =
    images?.[0]?.images?.map((img: any) => img.link) || [];

  // Set main image from index
  const mainImage = galleryImages[mainImageIdx] || galleryImages[0] || "";

  const bulletPoints =
    attributes?.bullet_point?.map((bp: any) => bp.value) ?? [];

  return (
    <div className="container max-w-3xl py-10 cursor-default">
      <div className="mb-6">
        <Link href="/dashboard/amazon/products">
          <Button variant="outline">&larr; Back to Products</Button>
        </Link>
      </div>

      {/* Product Title */}
      <h1 className="font-bold text-2xl mb-4">{attributes?.item_name?.[0]?.value || product.asin}</h1>

      {/* Gallery */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/2">
          {mainImage ? (
            <img
              src={mainImage}
              alt={attributes?.item_name?.[0]?.value}
              className="w-full h-auto rounded-lg border"
            />
          ) : (
            <div className="w-full h-60 bg-gray-100 flex items-center justify-center rounded-lg">
              <span className="text-gray-400">No Image Available</span>
            </div>
          )}
          {galleryImages.length > 1 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {galleryImages.map((img: string, idx: number) => (
                <img
                  key={img + idx}
                  src={img}
                  alt="Gallery"
                  onClick={() => setMainImageIdx(idx)}
                  className={`w-14 h-14 object-cover rounded border cursor-pointer transition-all ${
                    idx === mainImageIdx ? "ring-2 ring-black" : "opacity-70 hover:opacity-100"
                  }`}
                  style={{ borderColor: idx === mainImageIdx ? "#000" : "#ddd" }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <table className="table-fixed text-sm w-full">
            <tbody>
              <tr>
                <td className="py-1 pr-2 text-gray-500 font-medium">ASIN</td>
                <td className="py-1">{product.asin}</td>
              </tr>
              <tr>
                <td className="py-1 pr-2 text-gray-500 font-medium">Brand</td>
                <td className="py-1">{attributes?.brand?.[0]?.value || "-"}</td>
              </tr>
              <tr>
                <td className="py-1 pr-2 text-gray-500 font-medium">Model</td>
                <td className="py-1">{attributes?.model_number?.[0]?.value || "-"}</td>
              </tr>
              <tr>
                <td className="py-1 pr-2 text-gray-500 font-medium">Style</td>
                <td className="py-1">{attributes?.style?.[0]?.value || "-"}</td>
              </tr>
              <tr>
                <td className="py-1 pr-2 text-gray-500 font-medium">Color</td>
                <td className="py-1">{attributes?.color?.[0]?.value || "-"}</td>
              </tr>
              <tr>
                <td className="py-1 pr-2 text-gray-500 font-medium">List Price</td>
                <td className="py-1">
                  {attributes?.list_price?.[0]?.value
                    ? `$${attributes?.list_price?.[0]?.value}`
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="py-1 pr-2 text-gray-500 font-medium">Package Dimensions</td>
                <td className="py-1">
                  {formatDimensions(attributes?.item_package_dimensions?.[0])}
                </td>
              </tr>
              <tr>
                <td className="py-1 pr-2 text-gray-500 font-medium">Identifiers</td>
                <td className="py-1">{formatIdentifiers(attributes)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Highlights */}
      {bulletPoints.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold mb-2 text-lg">Highlights</h2>
          <ul className="list-disc ml-6 text-gray-800 text-sm">
            {bulletPoints.map((bp: string, i: number) => (
              <li key={i}>{bp}</li>
            ))}
          </ul>
        </div>
      )}

      {/* All Attributes */}
      <div className="mt-8">
        <h3 className="font-semibold mb-2 text-base">All Attributes</h3>
        <div className="bg-gray-50 rounded p-4 text-sm overflow-auto">
          <table className="w-full text-xs">
            <tbody>
              {Object.entries(attributes).map(([key, value]) => (
                <tr key={key} className="align-top">
                  <td className="pr-2 py-1 font-medium text-gray-600">{key}</td>
                  <td className="py-1">
                    {Array.isArray(value)
                      ? value
                          .map((v: any) =>
                            typeof v === "object" && v !== null
                              ? v.value ?? JSON.stringify(v)
                              : String(v)
                          )
                          .join(", ")
                      : String(value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;