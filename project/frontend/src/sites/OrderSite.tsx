import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import type { CartItem, User } from "../types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

interface OrderSiteProps {
  user: User | null;
  inCartItems: CartItem[];
  setInCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

function OrderSite({ user, inCartItems, setInCartItems }: OrderSiteProps) {
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
      <Card
        variant="outlined"
        sx={{ maxWidth: 800, width: "100%" }}
        className="shadow-lg"
      >
        <CardContent className="flex flex-col gap-4">
          <Typography variant="h5" className="font-bold">
            Order Summary
          </Typography>

          <Divider />

          <div className="flex flex-col justify-between gap-3">
            <Typography color="primary">Items:</Typography>
            <div className="flex flex-col gap-3">
              {Array.from(inCartItems.values()).map((product) => (
                <div className="flex flex-row items-center justify-end border-b gap-5">
                  <Typography>{product.title}</Typography>
                  <Typography>{product.quantity}</Typography>
                  <Divider />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between font-bold">
            <Typography variant="h6" color="primary">
              Total:
            </Typography>
            <Typography variant="h6">
              {cartSummary.totalPrice.toFixed(2)} $
            </Typography>
          </div>
        </CardContent>

        <CardActions className="flex justify-end p-4">
          <Link to="/cart">
            <Button variant="outlined">To cart</Button>
          </Link>
          <Link to="/">
            <Button variant="contained" color="primary">
              Finalise
            </Button>
          </Link>
        </CardActions>
      </Card>{" "}
    </div>
  );
}

export default OrderSite;
