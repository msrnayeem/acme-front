"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  id: string;
  date: string;
  status: string;
  paymentType: string;
  cardLast4: string;
  shipping: string;
  customer: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
}

const OrderDetailsPage = () => {
  const params = useParams();
  const orderId = params?.id as string;

  const [order] = useState<OrderDetails>({
    id: orderId,
    date: "03-05-2025",
    status: "Completed",
    paymentType: "Visa",
    cardLast4: "4242",
    shipping: "Express Delivery",
    customer: {
      name: "Tarikul Abir",
      address: "123 Main St, New York, NY 10001",
      email: "tarikulabir@gmail.com",
      phone: "+880 128388435",
    },
    items: [
      { product: "Iphone 13 Pro Max", quantity: 3, price: 999 },
      { product: "Macbook Air M4", quantity: 2, price: 999 },
      { product: "Macbook Air M3", quantity: 1, price: 1099 },
    ],
  });

  const subtotal = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-1">Order Details - {orderId}</h2>
      <p className="text-muted-foreground mb-6">
        Full information about this order
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 space-y-2">
            <p>
              <span className="font-medium">Date:</span> {order.date}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  order.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {order.status}
              </span>
            </p>
            <p>
              <span className="font-medium">Payment:</span>{" "}
              <span
                className={
                  order.status === "Completed"
                    ? "text-green-700"
                    : "text-red-600"
                }
              >
                {order.paymentType} **** {order.cardLast4}
              </span>
            </p>
            <p>
              <span className="font-medium">Shipping:</span> {order.shipping}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <p>
              <span className="font-medium">Name:</span> {order.customer.name}
            </p>
            <p>
              <span className="font-medium">Address:</span>{" "}
              {order.customer.address}
            </p>
            <p>
              <span className="font-medium">Email:</span> {order.customer.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {order.customer.phone}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left py-2">Product</th>
                <th className="text-left py-2">Quantity</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{item.product}</td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">${item.price}</td>
                  <td className="py-2">${item.price * item.quantity}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={2} className="py-2 font-semibold text-right"></td>
                <td className="py-2 font-semibold">Subtotal:</td>
                <td className="py-2 font-semibold">${subtotal}</td>
              </tr>
              <tr>
                <td colSpan={2} className="py-2 font-semibold text-right"></td>
                <td className="py-2 font-semibold">Total:</td>
                <td className="py-2 font-semibold">${subtotal}</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Note</label>
        <textarea
          rows={3}
          className="w-full border rounded p-2 text-sm"
          placeholder="Add notes about this order..."
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline">Cancel</Button>
        <Button>Update Order</Button>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
