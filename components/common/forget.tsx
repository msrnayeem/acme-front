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
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import Image from "next/image";

export default function Forget() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please Enter Email");
      return;
    }
    if (email) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/request-password-reset`,
          { email },
          {
            withCredentials: true,
          }
        );

        // console.log(response.data);
        // console.log(response);

        if (response.status === 200) {
          toast.success("reset otp send!");
          router.push(`/verification?email=${email}&type=resetpassword`);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          toast(err.response.data?.error || "Login failed");
        } else {
          toast("Register failed");
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
            <h2 className="text-2xl font-bold">Forget Password?</h2>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col ">
              {/* Email Input */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Value"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <Button type="button" variant="outline">
                  <Link href="/sign-in">Cancel</Link>
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "..." : "Reset Password"}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="justify-center "></CardFooter>
        </Card>
      </div>
    </div>
  );
}
