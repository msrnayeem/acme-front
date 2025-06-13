"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Eye } from "lucide-react";

type Order = {
  AmazonOrderId: string;
  PurchaseDate: string;
  OrderStatus: string;
  SalesChannel?: string;
  OrderType?: string;
  IsBusinessOrder?: boolean;
  IsPrime?: boolean;
  IsPremiumOrder?: boolean;
  FulfillmentChannel?: string;
  ShipmentServiceLevelCategory?: string;
  OrderTotal?: {
    CurrencyCode: string;
    Amount: string;
  };
  PaymentMethod?: string;
  PaymentMethodDetails?: string[];
  BuyerInfo?: {
    BuyerEmail?: string;
  };
  ShippingAddress?: {
    City?: string;
    StateOrRegion?: string;
    PostalCode?: string;
    CountryCode?: string;
    CompanyName?: string;
  };
  NumberOfItemsShipped?: number;
  NumberOfItemsUnshipped?: number;
  LastUpdateDate?: string;
  EarliestShipDate?: string;
  LatestShipDate?: string;
  EarliestDeliveryDate?: string;
  LatestDeliveryDate?: string;
};

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/proxy/orders");
        const orders: Order[] = res.data?.data?.payload?.Orders || [];
        const foundOrder = orders.find((o) => o.AmazonOrderId === orderId);
        setOrder(foundOrder ?? null);
      } catch (error) {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="container py-10 text-center text-gray-500">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-10 text-center text-red-500">
        Order not found.
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-bold text-2xl mb-1">Order Details</h1>
          <div className="text-gray-600 text-sm">
            Order ID: <span className="font-mono">{order.AmazonOrderId}</span>
          </div>
        </div>
        <button
          onClick={() => router.back()}
          className="ml-auto mb-2 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm"
        >
          &larr; Back
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          <div>
            <div>
              <span className="font-semibold">Order Status: </span>
              <span className="capitalize">{order.OrderStatus}</span>
            </div>
            <div>
              <span className="font-semibold">Purchase Date: </span>
              {order.PurchaseDate
                ? new Date(order.PurchaseDate).toLocaleString()
                : "-"}
            </div>
            <div>
              <span className="font-semibold">Last Update: </span>
              {order.LastUpdateDate
                ? new Date(order.LastUpdateDate).toLocaleString()
                : "-"}
            </div>
            <div>
              <span className="font-semibold">Order Type: </span>
              {order.OrderType || "-"}
            </div>
            <div>
              <span className="font-semibold">Sales Channel: </span>
              {order.SalesChannel || "-"}
            </div>
            <div>
              <span className="font-semibold">Fulfillment Channel: </span>
              {order.FulfillmentChannel || "-"}
            </div>
            <div>
              <span className="font-semibold">Shipment Service Level: </span>
              {order.ShipmentServiceLevelCategory || "-"}
            </div>
            <div>
              <span className="font-semibold">Business Order: </span>
              {order.IsBusinessOrder ? "Yes" : "No"}
            </div>
            <div>
              <span className="font-semibold">Prime Order: </span>
              {order.IsPrime ? "Yes" : "No"}
            </div>
            <div>
              <span className="font-semibold">Premium Order: </span>
              {order.IsPremiumOrder ? "Yes" : "No"}
            </div>
          </div>
          <div>
            <div>
              <span className="font-semibold">Order Total: </span>
              {order.OrderTotal
                ? `${order.OrderTotal.CurrencyCode} ${order.OrderTotal.Amount}`
                : "-"}
            </div>
            <div>
              <span className="font-semibold">Payment Method: </span>
              {order.PaymentMethod || "-"}
            </div>
            <div>
              <span className="font-semibold">Payment Details: </span>
              {order.PaymentMethodDetails?.join(", ") || "-"}
            </div>
            <div>
              <span className="font-semibold">Items Shipped: </span>
              {order.NumberOfItemsShipped ?? 0}
            </div>
            <div>
              <span className="font-semibold">Items Unshipped: </span>
              {order.NumberOfItemsUnshipped ?? 0}
            </div>
            <div>
              <span className="font-semibold">Earliest Ship Date: </span>
              {order.EarliestShipDate
                ? new Date(order.EarliestShipDate).toLocaleString()
                : "-"}
            </div>
            <div>
              <span className="font-semibold">Latest Ship Date: </span>
              {order.LatestShipDate
                ? new Date(order.LatestShipDate).toLocaleString()
                : "-"}
            </div>
            <div>
              <span className="font-semibold">Earliest Delivery Date: </span>
              {order.EarliestDeliveryDate
                ? new Date(order.EarliestDeliveryDate).toLocaleString()
                : "-"}
            </div>
            <div>
              <span className="font-semibold">Latest Delivery Date: </span>
              {order.LatestDeliveryDate
                ? new Date(order.LatestDeliveryDate).toLocaleString()
                : "-"}
            </div>
            <div>
              <span className="font-semibold">Buyer Email: </span>
              {order.BuyerInfo?.BuyerEmail || "-"}
            </div>
            <div>
              <span className="font-semibold">Shipping Address: </span>
              {order.ShippingAddress ? (
                <div>
                  {order.ShippingAddress.CompanyName && (
                    <>
                      <span>{order.ShippingAddress.CompanyName}, </span>
                    </>
                  )}
                  <span>
                    {order.ShippingAddress.City}, {order.ShippingAddress.StateOrRegion}{" "}
                    {order.ShippingAddress.PostalCode}, {order.ShippingAddress.CountryCode}
                  </span>
                </div>
              ) : (
                "-"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;