import { NextRequest, NextResponse } from "next/server";

// This API route acts as a proxy to the Amazon orders API to bypass CORS issues.
export async function GET(req: NextRequest) {
  const apiRes = await fetch("https://acme-api.logicmatrix.tech/api/amazon/orders", {
    // If your API needs authentication, add headers here.
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    // If you need to forward query params, parse and append here.
  });

  const data = await apiRes.json();
  return NextResponse.json(data);
}