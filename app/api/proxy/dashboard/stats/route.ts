import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiRes = await fetch("https://acme-api.logicmatrix.tech/api/amazon/dashboard/stats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!apiRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: apiRes.status }
    );
  }

  const data = await apiRes.json();

  return NextResponse.json(data);
}