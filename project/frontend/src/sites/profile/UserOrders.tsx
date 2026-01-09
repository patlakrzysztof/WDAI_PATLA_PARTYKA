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

const mockOrders: Order[] = Array.from({ length: 10 }, (_, index) => ({
  orderId: index + 1,
  userId: 1,
  orderDate: new Date(2024, 0, index + 1),
  sentDate: index < 8 ? new Date(2024, 0, index + 2) : null,
  inDate: index < 6 ? new Date(2024, 0, index + 5) : null,
  items: [
    {
      productId: (index % 5) + 1,
      quantity: (index % 3) + 1,
      priceAtPurchase: 19.99 + index * 5,
    },
    {
      productId: (index % 5) + 2,
      quantity: 1,
      priceAtPurchase: 9.99,
    },
  ],
  address: {
    country: "Poland",
    city: index % 2 === 0 ? "Warsaw" : "Krakow",
    zipCode: "00-001",
    street: "Main Street",
    houseNumber: index + 1,
    flatNumber: index % 3 === 0 ? index : null,
  },
}));

export default function UserOrders() {
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
      <TableContainer className="max-h-[600px]">
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
            {mockOrders.map((order) => {
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
                      Details
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
