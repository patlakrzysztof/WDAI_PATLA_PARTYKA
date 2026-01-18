import { useParams } from "react-router-dom";
import type { Order } from "../types";
import {
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function OrderDetails() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const { orderId } = useParams();

  const [status, setStatus] = useState("Processing");

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await fetch(`http://localhost:3002/orders/${orderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) return;
        const rawData = await res.json();

        if (rawData) {
          const formattedOrder: Order = {
            ...rawData,
            orderId: rawData.id,
            orderDate: new Date(rawData.orderDate),
            sentDate: rawData.sentDate ? new Date(rawData.sentDate) : null,
            inDate: rawData.inDate ? new Date(rawData.inDate) : null,
          };

          setOrder(formattedOrder);

          const tp = formattedOrder.items.reduce(
            (sum, item) => sum + item.quantity * item.priceAtPurchase,
            0,
          );
          setTotalPrice(tp + (formattedOrder.shipment || 0));

          const newStatus = formattedOrder.inDate
            ? "Completed"
            : formattedOrder.sentDate
              ? "Sent"
              : "Processing";
          setStatus(newStatus);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      getOrders();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="w-full flex flex-row justify-center items-center">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="w-full flex flex-row justify-center items-center">
        <h2>No order found</h2>
      </div>
    );
  }

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
                  <Typography sx={{ fontSize: "0.7rem" }} color="grey">
                    Shipment
                  </Typography>
                  <Typography sx={{ fontSize: "1.1rem" }} className="mb-2">
                    {order.shipment.toFixed(2)}$
                  </Typography>
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
                  </Typography>
                  <Typography variant="body1">
                    {order.address.zipCode} {order.address.city}
                  </Typography>
                  <Typography variant="body1" className="text-gray-500">
                    {order.address.country.toUpperCase()}
                  </Typography>
                </div>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6">Contact</Typography>
                <Typography variant="body1" className="text-gray-700">
                  {order.contact}
                </Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
