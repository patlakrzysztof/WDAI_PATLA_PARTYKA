import { useParams } from "react-router-dom";
import type { Order } from "../types";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { useState } from "react";

const order: Order = {
  orderId: 101,
  userId: 1,
  orderDate: new Date("2023-11-15T14:30:00"),
  sentDate: new Date("2023-11-16T09:00:00"),
  inDate: new Date("2023-11-16T19:00:01"),
  items: [
    {
      productId: 1,
      productName: "shoes",
      quantity: 2,
      priceAtPurchase: 29.99,
    },
    {
      productId: 3,
      productName: "bag",
      quantity: 1,
      priceAtPurchase: 19.99,
    },
  ],
  address: {
    country: "Poland",
    city: "Krakow",
    zipCode: "30-001",
    street: "Market Square",
    houseNumber: 12,
    flatNumber: 4,
  },
};

export default function OrderDetails() {
  const { orderId } = useParams();

  // Determine status based on dates
  const initialStatus = order.inDate
    ? "Completed"
    : order.sentDate
    ? "Sent"
    : "Processing";

  const [status, setStatus] = useState(initialStatus);

  const totalPrice = order.items.reduce(
    (sum, item) => sum + item.quantity * item.priceAtPurchase,
    0
  );

  return (
    <div className="w-full flex flex-col items-center p-4">
      <Card sx={{ width: "100%", maxWidth: "900px" }}>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
            <div>
              <Typography variant="h4" component="h1" fontWeight="bold">
                Order Details
              </Typography>
              <Typography variant="subtitle1" color="gray">
                Placed on {order.orderDate.toLocaleDateString()}
              </Typography>
            </div>
            <Typography variant="h6" color="gray">
              #{order.orderId}
            </Typography>
          </div>

          <Divider />

          <div className="flex flex-col items-center p-6 gap-3">
            <Typography
              className={`py-2 px-6 rounded-full font-bold tracking-wide shadow-sm ${
                status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : status === "Sent"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              {status.toUpperCase()}
            </Typography>

            <div className="flex flex-col items-center text-sm text-gray-600 gap-1">
              {order.sentDate && (
                <Typography sx={{ fontSize: "0.8rem" }}>
                  <span className="font-bold">Sent:</span>
                  <span>
                    {" "}
                    {order.sentDate.toLocaleDateString()}{" "}
                    {order.sentDate.toLocaleTimeString()}
                  </span>
                </Typography>
              )}
              {order.inDate && (
                <Typography sx={{ fontSize: "0.8rem" }}>
                  <span className="font-semibold">Delivered:</span>
                  <span>
                    {" "}
                    {order.inDate.toLocaleDateString()}{" "}
                    {order.inDate.toLocaleTimeString()}
                  </span>
                </Typography>
              )}
            </div>
          </div>

          <Divider />

          <div className="flex flex-col lg:flex-row gap-8 my-6">
            <div className="flex-grow">
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontSize: "2rem" }}
              >
                Items
              </Typography>
              <div className="flex flex-col">
                {order.items.map((item) => (
                  <div className="flex flex-row justify-between items-center py-3 border-t-2">
                    <div>
                      <Typography sx={{ fontSize: "1.1rem" }}>
                        {item.productName}
                      </Typography>
                      <Typography sx={{ fontSize: "0.75rem" }} color="grey">
                        {item.quantity} x {item.priceAtPurchase.toFixed(2)}$
                      </Typography>
                    </div>

                    <Typography>
                      {(item.priceAtPurchase * item.quantity).toFixed(2)}$
                    </Typography>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end border-t border-gray-400 pt-4">
                <div className="text-right">
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    Total Amount
                  </Typography>
                  <Typography sx={{ fontSize: "1.5rem" }} fontWeight="bold">
                    {totalPrice.toFixed(2)}$
                  </Typography>
                </div>
              </div>
            </div>

            <div className="lg:w-80">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-full">
                <Typography variant="h6">Shipping Address</Typography>
                <div className="text-gray-700 space-y-1">
                  <Typography variant="body1">
                    {order.address.street} {order.address.houseNumber}
                    {order.address.flatNumber
                      ? ` / ${order.address.flatNumber}`
                      : ""}
                  </Typography>
                  <Typography variant="body1">
                    {order.address.zipCode} {order.address.city}
                  </Typography>
                  <Typography variant="body1" className="text-gray-500">
                    {order.address.country.toUpperCase()}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
