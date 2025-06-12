"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import Image from "next/image";

export default function Reset() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email");
    if (!password || !confirmpassword) {
      toast.error("Please fill password");
      return;
    }
    if (password !== confirmpassword) {
      toast.error("Password does not match");
      return;
    }
    if (password === confirmpassword) {
      // console.log(password);
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/reset-password`,
          { email, password },
          {
            withCredentials: true,
          }
        );

        console.log(response.data);
        console.log(response);

        if (response.status === 200) {
          toast.success("password Reset successfully!");
          router.push("/sign-in");
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          toast(err.response.data?.error || " failed");
        } else {
          toast("Reset failed");
        }
      } finally {
        setLoading(false);
      }
    }
  };
  const imageUrl = "bgdots.svg";
  return (
    <div
      className="h-[90vh] w-full p-4 "
      style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover" }}
    >
      <Toaster position="top-right" />
      <div>
        <div className="flex items-center">
          <Image
            src="/acme-electronics.svg"
            alt="ACME Electronics Logo"
            width={32}
            height={32}
            className="h-8 w-auto object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center h-full items-center w-full p-8">
        <Card className="w-[320px] shadow-lg">
          <CardHeader className="text-start">
            <h2 className="text-2xl font-bold">Reset Password</h2>
            <p className="text-sm text-gray-500">Reset your password</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col ">
              {/* Password Input */}
              <div className="flex flex-col gap-1 mt-6">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="text"
                    placeholder="Value"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {/* Confirm Password Input */}
              <div className="flex flex-col gap-1 mt-6">
                <Label htmlFor="password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmpassword"
                    type="text"
                    placeholder="Value"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer mt-6"
                disabled={loading}
              >
                {loading ? "..." : "Reset"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center "></CardFooter>
        </Card>
      </div>
    </div>
  );
}
