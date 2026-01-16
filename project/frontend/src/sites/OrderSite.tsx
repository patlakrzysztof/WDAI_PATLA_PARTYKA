import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import type { Address, CartItem, OrderItem, User } from "../types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { Form } from "@base-ui/react";

interface OrderSiteProps {
  user: User | null;
  inCartItems: CartItem[];
  setInCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

function OrderSite({ user, inCartItems, setInCartItems }: OrderSiteProps) {
  const [contactPhone, setContactPhone] = useState<string>();
  const [address, setAddress] = useState<Address>({
    country: "",
    city: "",
    zipCode: "",
    street: "",
    houseNumber: 0,
  });
  const cartSummary = Array.from(inCartItems.values()).reduce(
    (acc, item) => {
      acc.totalItems += item.quantity;
      acc.totalPrice += item.price * item.quantity;
      return acc;
    },
    { totalItems: 0, totalPrice: 0 }
  );
  const handleAddressChange = (
    field: keyof Address,
    value: string | number
  ) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  async function finaliseOrder() {
    if (!user) return alert("User not logged in");
    if (!contactPhone) return alert("Please enter your contact number");
    if (
      !address.street ||
      !address.city ||
      !address.zipCode ||
      !address.country
    )
      return alert("Please fill in all address fields");
    const orderItems = inCartItems.map((item) => ({
      productId: item.id,
      productName: item.title,
      quantity: item.quantity,
      priceAtPurchase: item.price,
    }));
    try {
      const response = await fetch("http://localhost:3002/orders", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderDate: new Date(),
          items: orderItems,
          address: address,
          contact: contactPhone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create order");
      }

      const newOrder = await response.json();
      alert("Order successfully created! Order ID: " + newOrder.id);
      setInCartItems([]);
    } catch (err: any) {
      console.error(err);
      alert("Error creating order: " + err.message);
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center p-6">
        <Card
          variant="outlined"
          sx={{ maxWidth: screen, width: "100%" }}
          className="shadow-lg"
        >
          <CardContent className="flex flex-col gap-6">
            <Typography variant="h4" className="font-bold text-center">
              Checkout
            </Typography>

            <Divider />

            <div className="flex flex-col gap-4">
              <Typography variant="h6">Customer details</Typography>

              <div className="flex flex-col md:flex-row gap-4">
                <TextField fullWidth value={user?.name} disabled />
                <TextField fullWidth value={user?.surname} disabled />
              </div>

              <TextField fullWidth value={user?.mail} disabled />
            </div>

            <Divider />

            <div className="flex flex-col gap-4">
              <Typography variant="h6">Contact & delivery</Typography>
              <Divider />
              <Typography variant="subtitle1">Contact</Typography>
              <TextField
                fullWidth
                label="Contact number"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
              <Typography variant="subtitle1">Address</Typography>
              <TextField
                fullWidth
                label="Country"
                placeholder="Country"
                color="primary"
                value={address.country}
                onChange={(e) => handleAddressChange("country", e.target.value)}
              />
              <TextField
                fullWidth
                label="City"
                placeholder="City"
                color="primary"
                value={address.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
              />
              <TextField
                fullWidth
                label="zipCode"
                placeholder="zipCode"
                color="primary"
                value={address.zipCode}
                onChange={(e) => handleAddressChange("zipCode", e.target.value)}
              />
              <TextField
                fullWidth
                label="Street"
                placeholder="Street"
                color="primary"
                value={address.street}
                onChange={(e) => handleAddressChange("street", e.target.value)}
              />
              <TextField
                fullWidth
                label="House nr"
                placeholder="House nr"
                color="primary"
                value={address.houseNumber}
                onChange={(e) =>
                  handleAddressChange("houseNumber", e.target.value)
                }
              />
            </div>

            <Divider />

            <div className="flex flex-col gap-4">
              <Typography variant="h6">Order summary</Typography>

              {inCartItems.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between border-b pb-2 gap-10"
                >
                  <Typography>
                    {product.title} × {product.quantity}
                  </Typography>
                  <Typography>
                    {(product.price * product.quantity).toFixed(2)} $
                  </Typography>
                </div>
              ))}
              <div className="flex justify-between">
                <Typography>Shipment:</Typography>
                <Typography>{cartSummary.totalPrice > 20 ? 0 : 5} $</Typography>
              </div>

              <div className="flex justify-between font-bold text-lg pt-2">
                <Typography>Total:</Typography>
                <Typography>
                  {(
                    cartSummary.totalPrice +
                    (cartSummary.totalPrice > 20 ? 0 : 5)
                  ).toFixed(2)}{" "}
                  $
                </Typography>
              </div>
            </div>
          </CardContent>

          <CardActions className="flex justify-between p-4">
            <Link to="/cart">
              <Button variant="outlined">Back to cart</Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => finaliseOrder()}
            >
              Finalise order
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default OrderSite;
