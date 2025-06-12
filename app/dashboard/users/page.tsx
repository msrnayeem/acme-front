"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import TotalStatCard from "@/components/dashboard/TotalStatCard";
import { CalendarDays, Eye, Mail, Pencil, Trash2 } from "lucide-react";
import {
  CustomTable,
  CustomTableBody,
  CustomTableCell,
  CustomTableHead,
  CustomTableHeader,
  CustomTableRow,
} from "@/components/dashboard/CustomDataTable";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ContactInfoLine from "@/components/dashboard/ContactInfoLine";
import { EditUserDialog } from "@/components/dashboard/users/EditUserDialog";
import { toast } from "sonner";

interface User {
  id: number;
  name: string; // now required to fix the type conflict
  email: string;
  role: string;
  updatedAt: string;
  verified: boolean;
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users?page=${page}&limit=${limit}`,
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const fetchedUsers: User[] = res.data.data || [];
        // Make sure every user has name; if not, assign default
        const normalizedUsers = fetchedUsers.map((u) => ({
          ...u,
          name: u.name || "Unnamed User",
        }));
        setUsers(normalizedUsers);
      } catch (err) {
        console.error("Failed to fetch users", err);
        setUsers([]);
      }
    };
    fetchUsers();
  }, [page, limit]);

  const handleEditClick = async (userId: number) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`,
        {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          }
      );
      const user: User = res.data.data;
      if (!user.name) user.name = "Unnamed User";
      setEditUser(user);
      setEditDialogOpen(true);
    } catch (err) {
      toast.error("Failed to fetch user details");
    }
  };

  const handleEditSuccess = async () => {
    setEditDialogOpen(false);
    setEditUser(undefined);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users?page=${page}&limit=${limit}`,
        {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          }
      );
      const fetchedUsers: User[] = res.data.data || [];
      const normalizedUsers = fetchedUsers.map((u) => ({
        ...u,
        name: u.name || "Unnamed User",
      }));
      setUsers(normalizedUsers);
    } catch (err) {}
  };

  return (
    <div>
      <div className="pb-6">
        <h1 className="font-semibold text-3xl">Users</h1>
        <p className="font-medium text-gray-500 text-base">Manage your user accounts</p>
      </div>
      <div className="flex gap-5 mb-6">
        <TotalStatCard
          total={users.length}
          growthPercentage={1.3}
          icon="/user.svg"
          title="total users"
        />
      </div>

      <div>
        <CustomTable>
          <CustomTableHeader>
            <CustomTableRow>
              <CustomTableHead>User</CustomTableHead>
              <CustomTableHead>Email</CustomTableHead>
              <CustomTableHead>Role</CustomTableHead>
              <CustomTableHead>Verified</CustomTableHead>
              <CustomTableHead>Last Updated</CustomTableHead>
              <CustomTableHead>Actions</CustomTableHead>
            </CustomTableRow>
          </CustomTableHeader>
          <CustomTableBody>
            {users.map((user) => (
              <CustomTableRow key={user.id}>
                <CustomTableCell>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/default-avatar.png"
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                      width={32}
                      height={32}
                    />
                    <span className="font-medium">{user.name}</span>
                  </div>
                </CustomTableCell>
                <CustomTableCell>{user.email}</CustomTableCell>
                <CustomTableCell>{user.role}</CustomTableCell>
                <CustomTableCell>
                  {user.verified ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </CustomTableCell>
                <CustomTableCell>{new Date(user.updatedAt).toLocaleString()}</CustomTableCell>
                <CustomTableCell>
                  <div className="flex items-center gap-3">
                    <Dialog>
                      <DialogTrigger>
                        <Eye className="w-4 h-4 cursor-pointer" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>User Details</DialogTitle>
                          <DialogDescription>
                            <div className="flex flex-col gap-2">
                              <ContactInfoLine icon={Mail} label="Email" value={user.email} />
                              <ContactInfoLine
                                icon={CalendarDays}
                                label="Last Updated"
                                value={new Date(user.updatedAt).toLocaleString()}
                              />
                              <ContactInfoLine icon={Pencil} label="Role" value={user.role} />
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    <button title="Edit" onClick={() => handleEditClick(user.id)}>
                      <Pencil className="w-4 h-4 cursor-pointer" />
                    </button>
                    <button title="Delete">
                      <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
                    </button>
                  </div>
                </CustomTableCell>
              </CustomTableRow>
            ))}
          </CustomTableBody>
        </CustomTable>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded ${
              page === 1 ? "bg-gray-200 text-gray-500" : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Previous
          </button>
          <span className="px-4 py-2">Page {page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={users.length < limit}
            className={`px-4 py-2 rounded ${
              users.length < limit ? "bg-gray-200 text-gray-500" : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <EditUserDialog
        isOpen={editDialogOpen}
        user={editUser}
        onClose={() => setEditDialogOpen(false)}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default UserPage;
