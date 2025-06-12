import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie") || "";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile`,
      {
        headers: {
          Cookie: cookie,
        },
        credentials: "include",
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await res.json();
    // console.log(user.data);
    return NextResponse.json(user.data);
  } catch (error) {
    console.error("❌ Failed to reach backend /api/profile:", error);
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }
}
