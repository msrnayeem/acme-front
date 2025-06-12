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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import Loader from "@/components/common/loader";

const Categorypage = () => {
  interface Category {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch {
      toast.error("Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryAdd = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
        { name: categoryName.trim() },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Category added successfully");
        setCategoryName("");
        fetchCategories();
      } else {
        toast.error("Failed to add category");
      }
    } catch {
      toast.error("Error adding category");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryUpdate = async () => {
    if (!editCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${editCategoryId}`,
        { name: editCategoryName.trim() },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Category updated successfully");
        setEditCategoryId(null);
        setEditCategoryName("");
        fetchCategories();
      } else {
        toast.error("Failed to update category");
      }
    } catch {
      toast.error("Error updating category");
    }
  };

  const handleCategoryDelete = async (id: number) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Category deleted successfully");
        fetchCategories();
      } else {
        toast.error("Failed to delete category");
      }
    } catch {
      toast.error("Error deleting category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster />
      {loading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <Loader />
        </div>
      ) : (
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl text-gray-900 font-bold pb-2">
                Categories
              </h1>
              <p className="text-xs text-gray-500">
                Manage your product categories
              </p>
            </div>
            <Dialog>
              <DialogTrigger>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Category</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col py-4 gap-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleCategoryAdd}>Add Category</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            <TotalStatCard
              total={categories.length}
              growthPercentage={1.3}
              icon="/cube.svg"
              title="Total Categories"
            />
            {/* <TotalStatCard
              total={4}
              growthPercentage={1.3}
              icon="/select.svg"
              title="Active Categories"
            /> */}
            <TotalStatCard
              total={1200}
              growthPercentage={1.3}
              icon="/square.svg"
              title="Total Products"
            />
          </div>

          {/* Category Table */}
          <div className="p-4 mt-4">
            <h1 className="font-semibold text-2xl mb-4">All Categories</h1>
            <CustomTable>
              <CustomTableHeader>
                <CustomTableRow>
                  <CustomTableHead>Name</CustomTableHead>
                  <CustomTableHead>Created Date</CustomTableHead>
                  <CustomTableHead>Actions</CustomTableHead>
                </CustomTableRow>
              </CustomTableHeader>
              <CustomTableBody>
                {categories.map((category) => (
                  <CustomTableRow key={category.id} variant="striped">
                    <CustomTableCell>
                      <span className="font-medium">{category.name}</span>
                    </CustomTableCell>
                    <CustomTableCell className="text-muted-foreground">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </CustomTableCell>
                    <CustomTableCell>
                      <div className="flex items-center gap-3 justify-center w-full">
                        {/* Edit */}
                        <Dialog>
                          <DialogTrigger
                            onClick={() => {
                              setEditCategoryId(category.id);
                              setEditCategoryName(category.name);
                            }}
                          >
                            <Edit className="cursor-pointer" />
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Category</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col py-4 gap-2">
                              <Label htmlFor="edit-name">Category Name</Label>
                              <Input
                                id="edit-name"
                                value={editCategoryName}
                                onChange={(e) =>
                                  setEditCategoryName(e.target.value)
                                }
                              />
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button onClick={handleCategoryUpdate}>
                                Update Category
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {/* Delete */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Trash2 className="text-red-500 cursor-pointer" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete category:{" "}
                                <strong>{category.name}</strong>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleCategoryDelete(category.id)
                                }
                              >
                                Yes, delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CustomTableCell>
                  </CustomTableRow>
                ))}
              </CustomTableBody>
            </CustomTable>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorypage;
