"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EditProductPage = () => {
  const { sku } = useParams<{ sku: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [itemName, setItemName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [model, setModel] = useState("");
  const [bulletPoints, setBulletPoints] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [mainImageIdx, setMainImageIdx] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/amazon/products/${sku}`,
          { headers: { "Cache-Control": "no-cache" } }
        );

        const prod = res.data.data;
        setProduct(prod);
        setItemName(prod.attributes?.item_name?.[0]?.value || "");
        setBrand(prod.attributes?.brand?.[0]?.value || "");
        
        // Use offer price for the edit field
        const offerPrice = prod.offers?.[0]?.price?.amount;
        setPrice(offerPrice ? String(offerPrice) : "");
        
        setColor(prod.attributes?.color?.[0]?.value || "");
        setModel(prod.attributes?.model_number?.[0]?.value || "");
        setBulletPoints(
          prod.attributes?.bullet_point
            ? prod.attributes.bullet_point.map((bp: any) => bp.value)
            : []
        );
        setMainImageIdx(0);
      } catch {
        setError("Product not found");
      }
      setLoading(false);
    };
    if (sku) fetchProduct();
  }, [sku]);

  const handleBulletChange = (i: number, value: string) => {
    setBulletPoints((prev) => {
      const arr = [...prev];
      arr[i] = value;
      return arr;
    });
  };
  const handleAddBullet = () => setBulletPoints((prev) => [...prev, ""]);
  const handleRemoveBullet = (i: number) =>
    setBulletPoints((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setSubmitting(true);
    setError(null);

    const marketplaceId =
      product.summaries?.[0]?.marketplaceId ||
      product.attributes?.item_name?.[0]?.marketplace_id ||
      "ATVPDKIKX0DER";

    const productType =
      product.summaries?.[0]?.productType ||
      product.productType ||
      "SOUND_AND_RECORDING_EQUIPMENT";

    const patches: any[] = [];

    if (itemName) {
      patches.push({
        op: "replace",
        path: "/attributes/item_name",
        value: [
          {
            value: itemName,
            marketplace_id: marketplaceId,
          },
        ],
      });
    }
    if (brand) {
      patches.push({
        op: "replace",
        path: "/attributes/brand",
        value: [
          {
            value: brand,
            marketplace_id: marketplaceId,
          },
        ],
      });
    }
if (price) {
  console.log(price);
  
  patches.push({
    op: "replace",
    path: "/attributes/list_price",
    value: [
      {
        value: Number(price),
        currency: "USD",
        marketplace_id: marketplaceId
      }
    ]
  });
}

    if (color) {
      patches.push({
        op: "replace",
        path: "/attributes/color",
        value: [
          {
            value: color,
            marketplace_id: marketplaceId,
          },
        ],
      });
    }
    if (model) {
      patches.push({
        op: "replace",
        path: "/attributes/model_number",
        value: [
          {
            value: model,
            marketplace_id: marketplaceId,
          },
        ],
      });
    }
    if (bulletPoints.length > 0) {
      patches.push({
        op: "replace",
        path: "/attributes/bullet_point",
        value: bulletPoints
          .filter(Boolean)
          .map((bp) => ({
            value: bp,
            marketplace_id: marketplaceId,
          })),
      });
    }

    const patchBody = {
      productType,
      patches,
    };

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/amazon/products/${sku}`,
        patchBody,
        { headers: { "Cache-Control": "no-cache" } }
      );
      if (res.data?.success) {
        setSuccessData(res.data.data);
        setTimeout(() => {
          router.push(`/dashboard/amazon/products`);
        }, 4000);
      } else {
        setError("Failed to update product");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to update product"
      );
    }
    setSubmitting(false);
  };

  if (loading)
    return <div className="container py-12 text-center text-gray-500">Loading product...</div>;
  if (error || !product)
    return <div className="container py-12 text-center text-red-500">{error || "Product not found"}</div>;

  if (successData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50 p-4">
        <div className="bg-green-50 border border-green-200 p-8 rounded-lg text-center shadow max-w-md w-full">
          <div className="text-3xl mb-2 text-green-600 font-bold">Product Updated!</div>
          <div className="mb-2">
            <span className="font-semibold">SKU:</span> {successData.sku}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={
                successData.status === "ACCEPTED"
                  ? "text-green-700 font-semibold"
                  : "text-yellow-700 font-semibold"
              }
            >
              {successData.status}
            </span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Submission ID:</span>{" "}
            <span className="break-all">{successData.submissionId}</span>
          </div>
          <div className="mb-2 text-xs text-gray-500">
            Updated by: msrnayeem02 on 2025-06-10 19:20:43 UTC
          </div>
          {successData.issues?.length > 0 && (
            <div className="mt-3 text-left">
              <div className="font-semibold text-red-700 mb-1">Issues:</div>
              <ul className="list-disc pl-6">
                {successData.issues.map((issue: any, idx: number) => (
                  <li key={idx}>{issue.message || JSON.stringify(issue)}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="text-gray-500 mt-4">Redirecting to products dashboard...</div>
        </div>
      </div>
    );
  }

  let galleryImages: string[] = [];
  if (product.images?.[0]?.images) {
    galleryImages = product.images[0].images.map((img: any) => img.link);
  } else if (product.attributes?.main_product_image_locator?.[0]?.media_location) {
    galleryImages = [product.attributes.main_product_image_locator[0].media_location];
  } else if (product.summaries?.[0]?.mainImage?.link) {
    galleryImages = [product.summaries[0].mainImage.link];
  }
  const mainImage = galleryImages[mainImageIdx] || galleryImages[0] || "";

  return (
    <div className="container max-w-3xl py-10 cursor-default">
      <div className="mb-6 flex gap-2">
        <Link href={`/dashboard/amazon/products`}>
          <Button variant="outline">&larr; Cancel</Button>
        </Link>
      </div>
      <h1 className="font-bold text-2xl mb-6">Edit Product</h1>
      
      {/* User and timestamp info */}
      <div className="mb-4 text-sm text-gray-500">
        Editing as: <strong>msrnayeem02</strong> | {new Date().toISOString().replace('T', ' ').substring(0, 19)} UTC
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/2">
          {mainImage ? (
            <img
              src={mainImage}
              alt={itemName}
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

        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Product Name</label>
              <input
                className="w-full border p-2 rounded"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Brand</label>
              <input
                className="w-full border p-2 rounded"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Offer Price (Editable)</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="0.01"
                placeholder="Enter offer price"
              />
              <div className="mt-2 text-sm text-gray-500">
                <div>List Price: <strong>${product.attributes?.list_price?.[0]?.value || "N/A"}</strong></div>
                <div>Purchasable Price: <strong>${product.attributes?.purchasable_offer?.[0]?.our_price?.[0]?.schedule?.[0]?.value_with_tax || "N/A"}</strong></div>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Color</label>
              <input
                className="w-full border p-2 rounded"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Enter color"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Model Number</label>
              <input
                className="w-full border p-2 rounded"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Enter model number"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Bullet Points</label>
              {bulletPoints.map((bp, i) => (
                <div className="flex items-center mb-2" key={i}>
                  <input
                    className="w-full border p-2 rounded"
                    value={bp}
                    onChange={(e) => handleBulletChange(i, e.target.value)}
                    placeholder={`Bullet point ${i + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveBullet(i)}
                    className="ml-2 text-red-500 font-bold hover:text-red-700"
                    tabIndex={-1}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={handleAddBullet}>
                Add Bullet Point
              </Button>
            </div>
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Updating..." : "Update Product"}
            </Button>
            {error && (
              <div className="text-red-500 text-center mt-2">{error}</div>
            )}
          </form>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="font-semibold mb-2 text-base">All Attributes</h3>
        <div className="bg-gray-50 rounded p-4 text-sm overflow-auto">
          <table className="w-full text-xs">
            <tbody>
              {Object.entries(product.attributes || {}).map(([key, value]) => (
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
      
      {/* Footer with user info */}
      <div className="mt-8 pt-4 border-t text-xs text-gray-400 text-center">
        Product editing session by msrnayeem02 | Session started: 2025-06-10 19:20:43 UTC
      </div>
    </div>
  );
};

export default EditProductPage;