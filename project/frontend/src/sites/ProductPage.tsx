import { useParams } from "react-router-dom";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React, { useState } from "react";

//types
import type { CartItem, Product, Review } from "../types";

interface ProductPageProps {
  userId: number;
  inCartItems: CartItem[];
  setInCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  products: Product[];
}

function ProductPage({
  userId,
  inCartItems,
  setInCartItems,
  products,
}: ProductPageProps) {
  const { productName } = useParams();

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  const product = products.find(
    (product) => slugify(product.title) === productName
  );
  const [quantity, setQuantity] = useState<number>(0);

  const addToCart = async (product: Product) => {
    if (!product) return;
    try {
      const response = await fetch("http://localhost:3004/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId: product.id,
          quantity: quantity,
        }),
      });

      const newItem = await response.json();

      setInCartItems((prev) => {
        if (prev.some((i) => i.id === product.id)) {
          return prev; // NIC nie dodawaj
        }

        return [...prev, { ...product, quantity }];
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!product) {
    return (
      <div>
        <Card
          className="flex justify-center items-center p-10 w-screen h-1/2"
          sx={{ backgroundColor: "primary.main" }}
        >
          <CardContent className="flex flex-col justify-center items-center gap-10">
            <Typography variant="h3" color="textSecondary">
              Loading or product not found...
            </Typography>
          </CardContent>
        </Card>
        ;
      </div>
    );
  }

  //for now it is static for all products (just to make a UI)
  const reviews: Review[] = [
    {
      id: 1,
      person: "Jack",
      text: "not bad",
      rating: 4.5,
      avatar: "/static/images/avatar/5.jpg",
    },
    {
      id: 2,
      person: "Brad",
      text: `Very good present`,
      rating: 4,
      avatar: "/static/images/avatar/1.jpg",
    },
    {
      id: 3,
      person: "Will",
      text: "I don't like this",
      rating: 2,
      avatar: "/static/images/avatar/2.jpg",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-center gap-5">
        <Card variant="outlined" sx={{ maxWidth: 700 }}>
          <CardContent sx={{ p: 2 }}>
            <div className="flex flex-row items-center justify-between gap-5">
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
            </div>
            <Divider />
            <div className="flex flex-row gap-10 mt-5">
              <img
                src={product.image}
                alt={product.title}
                className="w-80 h-80 object-contain mb-5"
              />
              <div className="flex flex-col justify-between">
                <Typography gutterBottom variant="h6" component="div">
                  {product.description}
                </Typography>
                <div className="flex flex-row justify-end items-center mb-2">
                  {inCartItems.some((item) => item.id === product.id) && (
                    <Typography color="red">IN CART</Typography>
                  )}
                  <TextField
                    label="Quantity"
                    type="number"
                    value={quantity}
                    id="quantity-input"
                    sx={{ m: 1, width: "10ch" }}
                    color="primary"
                    focused
                    inputProps={{ min: 0, max: 15, step: 1 }}
                    onChange={(val) => setQuantity(Number(val.target.value))}
                    disabled={inCartItems.some(
                      (item) => item.id === product.id
                    )}
                  />
                  <IconButton
                    onClick={() => addToCart(product)}
                    color="primary"
                    aria-label="add to shopping cart"
                    disabled={inCartItems.some(
                      (item) => item.id === product.id
                    )}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                </div>
              </div>
            </div>
            <Divider />
            <div className="flex flex-row items-center justify-between p-1 mb-2">
              <div>
                <Rating
                  name="read-only"
                  value={product.rating_rate}
                  readOnly
                  className="mb-3"
                />
                ({product.rating_count})
              </div>
              <Typography gutterBottom variant="h4" component="div">
                {product.price}$
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
      <br />
      <div className="flex flex-col justify-center items-center">
        <Typography variant="h5">Customer Reviews</Typography>
        <div className="mt-5">
          <Paper square>
            <List sx={{ mb: 2, width: 700 }}>
              {reviews.map(({ id, person, text, rating, avatar }) => (
                <React.Fragment key={id}>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar alt="Profile Picture" src={avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{ color: "text.primary", fontWeight: 600 }}
                        >
                          {person}
                        </Typography>
                      }
                      secondary={
                        <Typography sx={{ color: "text.primary" }}>
                          {text}
                        </Typography>
                      }
                    />
                    <Rating
                      name="read-only"
                      value={rating}
                      readOnly
                      className="mb-3"
                    />
                  </ListItemButton>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
