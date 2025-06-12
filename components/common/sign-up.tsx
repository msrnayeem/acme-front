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

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast.error("Please fill Credentials");
      return;
    }
    if (email && password && name) {
      console.log(email, password, name);
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
          { email, password, name },
          {
            withCredentials: true,
          }
        );

        console.log(response.data);
        console.log(response);

        if (response.status === 201) {
          toast.success("User Create successfully!");
          router.push(`/verification?email=${email}&type=register`);
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
            <h2 className="text-2xl font-bold">Sign up</h2>
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-gray-900 font-bold underline"
              >
                Sign In
              </Link>
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col ">
              {/* Name Input */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="email">Full Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Value"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              {/* Email Input */}
              <div className="flex flex-col gap-1 mt-6">
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

              {/* Password Input */}
              <div className="flex flex-col gap-1 mt-6">
                <Label htmlFor="password">Password</Label>
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

              <Button
                type="submit"
                className="w-full cursor-pointer mt-6"
                disabled={loading}
              >
                {loading ? "..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center "></CardFooter>
        </Card>
      </div>
    </div>
  );
}
