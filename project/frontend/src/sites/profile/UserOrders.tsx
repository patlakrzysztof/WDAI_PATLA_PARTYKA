import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Button,
  Card,
  Typography,
  Box,
} from "@mui/material";
import type { Order } from "../../types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await fetch("http://localhost:3002/orders/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!res.ok) return;
        const rawData = await res.json();

        if (rawData) {
          const formattedOrders: Order[] = rawData.map((order) => ({
            ...order,
            orderId: order.id,
            orderDate: new Date(order.orderDate),
            sentDate: order.sentDate ? new Date(order.sentDate) : null,
            inDate: order.inDate ? new Date(order.inDate) : null,
          }));
          setOrders(formattedOrders);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getOrders();
  }, []);

  const calculateStatus = (order: Order) => {
    if (order.inDate) return "Completed";
    else if (order.sentDate) return "Sent";
    else return "Processing";
  };

  const calculateTotal = (order: Order) => {
    return order.items.reduce(
      (acc, curr) => acc + curr.priceAtPurchase * curr.quantity,
      0
    );
  };

  return (
    <Card
      elevation={5}
      className="grow max-w-[800px] rounded-lg overflow-hidden bg-white h-fit"
    >
      <Box className="p-4">
        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
          Recent Orders
        </Typography>
      </Box>
      <TableContainer className="max-h-[700px]">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="bg-secondary">Date</TableCell>
              <TableCell className="bg-secondary">Status</TableCell>
              <TableCell className="bg-secondary">Total</TableCell>
              <TableCell className="bg-secondary" align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const status = calculateStatus(order);
              const total = calculateTotal(order);
              return (
                <TableRow key={order.orderId} hover>
                  <TableCell>{order.orderDate.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Box
                      className={`py-1 px-3 rounded-2xl inline-block text-xs font-bold ${
                        status === "Completed"
                          ? "bg-[#e6f4ea] text-[#1e4620]"
                          : status === "Sent"
                          ? "bg-[#e8f0fe] text-[#174ea6]"
                          : "bg-[#fce8e6] text-[#c5221f]"
                      }`}
                    >
                      {status.toUpperCase()}
                    </Box>
                  </TableCell>
                  <TableCell>${total.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="outlined" color="primary">
                      <Link to={`/orders/${order.orderId}`}>Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
