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

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!rememberMe) {
    //   toast("must check remember me");
    //   return;
    // }
    if (!email || !password) {
      toast.error("Please fill Credentials");
      return;
    }
    if (email && password) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
          { email, password },
          {
            withCredentials: true,
          }
        );

        // console.log(response.data);

        if (response.status === 200) {
          toast.success("Signed in successfully!");
          if (response.data?.user.role === "admin") {
            router.push("/dashboard");
          } else {
            router.push("/");
          }
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          toast(err.response.data?.error || "Login failed");
        } else {
          toast("Login failed");
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
            <h2 className="text-2xl font-bold">Sign in</h2>
            <p className="text-sm text-gray-500">
              New User?{" "}
              <Link
                href="/sign-up"
                className="text-gray-900 font-bold underline"
              >
                Create an acount
              </Link>
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col">
              {/* Email Input */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  {/* Email Icon
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-5 w-5" /> */}
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
                  {/* Email Icon */}
                  {/* <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-5 w-5" /> */}
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
                {loading ? "..." : "Sign In"}
              </Button>
            </form>
            {/* Remember Me + Forgot Password */}
            <div className="flex justify-between items-center mt-6">
              {/* <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember Me
                </Label>
              </div> */}
              <Link
                href="/forget-password"
                className="text-sm font-bold text-black underline"
              >
                Forgot password?
              </Link>
            </div>
          </CardContent>

          <CardFooter className="justify-center "></CardFooter>
        </Card>
      </div>
    </div>
  );
}
