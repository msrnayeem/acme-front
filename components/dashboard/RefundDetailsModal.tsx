"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type RefundProduct = {
  product: string;
  quantity: number;
  price: number;
};

type RefundDetailsProps = {
  trigger: React.ReactNode;
  refund: {
    id: string;
    date: string;
    amount: string;
    method: string;
    reason: string;
    notes: string;
    orderId: string;
    customer: string;
    email: string;
    status: string;
    products: RefundProduct[];
  };
};

export function RefundDetailsModal({ trigger, refund }: RefundDetailsProps) {
  const subtotal = refund.products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Refund Details</DialogTitle>
          <DialogDescription>
            Complete information about this Amazon refund request.
          </DialogDescription>
        </DialogHeader>

        {/* ID and Date */}
        <div className="flex justify-between items-center mt-2">
          <div className="text-lg font-semibold">REF-{refund.id}</div>
          <div className="text-sm text-gray-500">{refund.date}</div>
          <span
            className={`text-xs px-3 py-1 rounded-2xl font-medium ${getStatusColor(
              refund.status
            )}`}
          >
            {refund.status}
          </span>
        </div>

        {/* Refund Info & Order Info */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p>
              <strong>Refund Amount:</strong> {refund.amount}
            </p>
            <p>
              <strong>Refund Method:</strong> {refund.method}
            </p>
            <p>
              <strong>Reason:</strong> {refund.reason}
            </p>
            <p>
              <strong>Notes:</strong> {refund.notes}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p>
              <strong>Order ID:</strong> {refund.orderId}
            </p>
            <p>
              <strong>Customer:</strong> {refund.customer}
            </p>
            <p>
              <strong>Email:</strong> {refund.email}
            </p>
          </div>
        </div>

        {/* Refunded Products */}
        <div className="bg-gray-50 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {refund.products.map((item, index) => (
                <tr key={index} className="border-b last:border-none">
                  <td className="py-1">{item.product}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.quantity * item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end gap-6 mt-2 text-sm font-medium">
            <p>Subtotal: ${subtotal}</p>
            <p>Total Refund: ${subtotal}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "bg-orange-100 text-orange-500";
    case "completed":
      return "bg-green-100 text-green-500";
    case "rejected":
      return "bg-red-100 text-red-500";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
