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
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import Image from "next/image";
import axios from "axios";

export default function Verification() {
  const [otp, setotp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email");
    const type = searchParams.get("type");
    if (!otp) {
      toast.error("Please Enter Pin");
      return;
    }
    if (!email) {
      toast.error("No email found");
      return;
    }
    if (otp.length < 6) {
      toast.error("Pin must be 6 digits");
      return;
    }
    if (otp.length === 6) {
      console.log(otp);
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify-otp`,
          { email, otp },
          {
            withCredentials: true,
          }
        );

        // console.log(response.data);
        // console.log(response);

        if (response.status === 200 && type === "register") {
          toast.success("User Register successfully!");
          router.push("/sign-in");
        }
        if (response.status === 200 && type === "resetpassword") {
          toast.success("otp verified successfully!");
          router.push(`/reset?email=${email}`);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          toast(err.response.data?.error || " failed");
        } else {
          toast("Register failed");
        }
      } finally {
        setLoading(false);
      }
    }
  };
  const resendOTP = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email");
    const type = searchParams.get("type");
    if (!email) {
      toast.error("No email found");
      return;
    }
    if (!type) {
      toast.error("No type found");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/resend-otp`,
        { email, type },
        {
          withCredentials: true,
        }
      );

      // console.log(response.data);
      // console.log(response);

      if (response.status === 200) {
        toast.success("OTP Resent successfully!");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        toast(err.response.data?.error || " failed");
      } else {
        toast("Resend OTP failed");
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
            <h2 className="text-2xl font-bold">Enter Verification Pin</h2>
            <p className="text-sm text-gray-500">
              Enter 6 Digit Verification pin that has been sent to your email
              address.{" "}
              <button
                onClick={resendOTP}
                className="text-gray-700 font-bold cursor-pointer"
              >
                Resend
              </button>
            </p>
          </CardHeader>

          <CardContent>
            <div>
              <p className="text-xs text-red-500 text-center bg-red-100/40">
                This code will expire in 10 minutes.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col ">
              {/* Pin Input */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="email">Pin</Label>
                <div className="relative">
                  <Input
                    id="pin"
                    type="text"
                    placeholder="Value"
                    value={otp}
                    onChange={(e) => setotp(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-8 items-center mt-6">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "..." : "Verify"}
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
