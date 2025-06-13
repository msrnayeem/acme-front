import { NextRequest, NextResponse } from "next/server";

// This API route returns a single order by orderId as a proxy to bypass CORS issues.
export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;
  const apiRes = await fetch("https://acme-api.logicmatrix.tech/api/amazon/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!apiRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: apiRes.status }
    );
  }

  const data = await apiRes.json();
  const orders = data?.data?.payload?.Orders || [];
  const order = orders.find((o: any) => o.AmazonOrderId === orderId);

  if (!order) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, order });
}