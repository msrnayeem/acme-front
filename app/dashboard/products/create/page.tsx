"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadCloud, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const MAX_IMAGE_SIZE = 100 * 1024 * 1024;

type FormData = {
  productName: string;
  category: string;
  price: string;
  stock: string;
  status: string;
  images: File[];
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.productName) errors.productName = "Product name is required";
  if (!data.category) errors.category = "Select a category";

  const price = Number(data.price);
  if (isNaN(price) || price < 1) errors.price = "Enter a valid price";

  const stock = Number(data.stock);
  if (isNaN(stock) || stock < 0) errors.stock = "Stock must be at least 0";

  if (!data.status) errors.status = "Select product status";

  if (!data.images || data.images.length === 0) {
    errors.images = "At least one image is required";
  } else {
    for (const file of data.images) {
      if (file.size > MAX_IMAGE_SIZE) {
        errors.images = "Each image must be less than 100 MB";
        break;
      }
    }
  }

  return errors;
};

export default function AddProductPage() {
  const [previews, setPreviews] = useState<
    { dataUrl: string | ArrayBuffer | null; name: string; size: number; error?: boolean }[]
  >([]);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    category: "",
    price: "",
    stock: "",
    status: "",
    images: [],
  });

  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        if (typeof preview.dataUrl === "string" && preview.dataUrl.startsWith("blob:")) {
          URL.revokeObjectURL(preview.dataUrl);
        }
      });
    };
  }, [previews]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const allFiles = [...formData.images, ...selectedFiles];
    setFormData((prev) => ({
      ...prev,
      images: allFiles,
    }));

    const newPreviews = selectedFiles.map(
      (file) =>
        new Promise<{ dataUrl: string | ArrayBuffer | null; name: string; size: number; error?: boolean }>(
          (resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              resolve({
                dataUrl: event.target?.result ?? null,
                name: file.name,
                size: file.size,
              });
            };
            reader.onerror = () => {
              resolve({
                dataUrl: "/api/placeholder/200/150",
                name: file.name,
                size: file.size,
                error: true,
              });
            };
            reader.readAsDataURL(file);
          }
        )
    );

    Promise.all(newPreviews).then((previewResults) => {
      setPreviews((prev) => [...prev, ...previewResults]);
    });

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);

    const newImages = [...formData.images];
    newImages.splice(index, 1);

    setPreviews(newPreviews);
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Submitted Data:", formData);
      alert("Product submitted successfully!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 border"
    >
      <h2 className="text-2xl font-semibold">Add Product</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="productName" className="mb-3">
            Product Name
          </Label>
          <Input
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Enter product name"
          />
          {formErrors.productName && (
            <p className="text-sm text-red-500">{formErrors.productName}</p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label className="mb-3">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="books">Books</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.category && (
              <p className="text-sm text-red-500">{formErrors.category}</p>
            )}
          </div>

          <div>
            <Label htmlFor="price" className="mb-3">
              Price
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
            {formErrors.price && (
              <p className="text-sm text-red-500">{formErrors.price}</p>
            )}
          </div>

          <div>
            <Label htmlFor="stock" className="mb-3">
              Stock
            </Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock"
            />
            {formErrors.stock && (
              <p className="text-sm text-red-500">{formErrors.stock}</p>
            )}
          </div>

          <div>
            <Label className="mb-3">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.status && (
              <p className="text-sm text-red-500">{formErrors.status}</p>
            )}
          </div>
        </div>

        <div>
          <Label className="mb-3">Product Images</Label>
          <label
            htmlFor="product-image"
            className="flex flex-col items-center justify-center border border-dashed border-gray-400 p-4 rounded-md cursor-pointer hover:bg-gray-100 text-gray-500"
          >
            <UploadCloud className="mb-2 h-12 w-12" />
            <span className="text-sm">
              {previews.length > 0
                ? `${previews.length} image(s) selected - Click to add more`
                : "Click to upload or drag images here"}
            </span>
            <span className="text-xs mt-1">Max file size: 100MB</span>
          </label>
          <input
            id="product-image"
            type="file"
            accept="image/*"
            multiple={true}
            className="hidden"
            onChange={handleImageUpload}
          />
          {formErrors.images && (
            <p className="text-sm text-red-500">{formErrors.images}</p>
          )}

          {previews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <div
                  key={index}
                  className="relative group w-full h-32 rounded-md border overflow-hidden bg-gray-100"
                >
                  <img
                    src={typeof preview.dataUrl === "string" ? preview.dataUrl : ""}
                    alt={`preview ${preview.name}`}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs truncate px-2 py-1">
                    {preview.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/dashboard/products">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit">Add Product</Button>
        </div>
      </div>
    </form>
  );
}
