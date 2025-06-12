// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  
  const path = request.nextUrl.pathname;
  
  const isAuthRoute = ["/sign-in", "/sign-up", "/forget", "/otp"].includes(
    path
  );
  const isAdminOnlyRoute = path.startsWith("/dashboard");

  console.log("middleware token : ", token);
  console.log("All cookies:", request.cookies.getAll());
  console.log("Request origin:", request.nextUrl.origin);
  console.log("Request pathname:", request.nextUrl.pathname);
  
  // If not logged in
  if (!token) {
    if (isAuthRoute) {
      return NextResponse.next();
    }

    if (path === "/" || isAdminOnlyRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  }

  const res = await fetch(`${request.nextUrl.origin}/api/proxy/profile`, {
    headers: {
      Cookie: request.headers.get("cookie") || "",
    },
  });

  const user = await res.json();

  const isAdmin = user?.role === "admin";

  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAdminOnlyRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/sign-in", "/sign-up", "/forget"],
};
