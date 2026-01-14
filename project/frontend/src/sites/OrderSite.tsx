import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import type { CartItem, User } from "../types";
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
  const [contactPhone, setContactPhone] = useState<Text>();
  const [address, setAddress] = useState<Text>();
  const cartSummary = Array.from(inCartItems.values()).reduce(
    (acc, item) => {
      acc.totalItems += item.quantity;
      acc.totalPrice += item.price * item.quantity;
      return acc;
    },
    { totalItems: 0, totalPrice: 0 }
  );
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
              />
              <Typography variant="subtitle1">Address</Typography>
              <TextField
                fullWidth
                label="Delivery address"
                placeholder="Street, building number, city, postal code"
                multiline
                rows={3}
                color="primary"
                value={address}
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

              <div className="flex justify-between font-bold text-lg pt-2">
                <Typography>Total:</Typography>
                <Typography>{cartSummary.totalPrice.toFixed(2)} $</Typography>
              </div>
            </div>
          </CardContent>

          <CardActions className="flex justify-between p-4">
            <Link to="/cart">
              <Button variant="outlined">Back to cart</Button>
            </Link>
            <Button variant="contained" color="primary" size="large">
              Finalise order
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default OrderSite;
