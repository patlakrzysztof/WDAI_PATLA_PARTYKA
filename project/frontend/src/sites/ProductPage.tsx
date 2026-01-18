import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//types
import type { CartItem, Product, Review, User } from "../types";

interface ProductPageProps {
  user: User | null;
  inCartItems: CartItem[];
  setInCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  products: Product[];
}

function ProductPage({
  user,
  inCartItems,
  setInCartItems,
  products,
}: ProductPageProps) {
  const { productName } = useParams();
  const navigate = useNavigate();

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  const product = products.find(
    (product) => slugify(product.title) === productName,
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [newRating, setNewRating] = useState<number | null>(0);
  const [newUsername, setNewUsername] = useState<string | null>(null);

  useEffect(() => {
    if (!product) return;
    fetch(`http://localhost:3002/reviews/${product.id}`)
      .then((res) => res.json())
      .then((data: Review[]) => setReviews(data))
      .catch((err) => console.error(err));
  }, [product]);

  const addToCart = async (product: Product) => {
    if (!product) return;
    if (!user) {
      navigate("/profile");
      return;
    }
    if (quantity < 1 || quantity > 15) {
      alert("You can add only 1–15 items of this product");
      return;
    }
    try {
      const response = await fetch("http://localhost:3002/api/cart", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Add to cart failed:", response.status, errorData);
        return;
      }

      console.log("Add to cart response:");

      setInCartItems((prev) => {
        if (prev.some((i) => i.id === product.id)) {
          return prev;
        }

        return [...prev, { ...product, quantity }];
      });
    } catch (err) {
      console.error(err);
    }
  };

  const submitReview = async () => {
    if (!newRating || newRating < 0 || newRating > 5) {
      alert("Rating must be between 0.5 and 5");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product?.id,
          rating: newRating,
          message: newMessage,
          username: user?.nickname ?? newUsername,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to add review:", errorData);
        return;
      }

      const data = await response.json();

      setReviews((prev) => [
        ...prev,
        {
          id: data.reviewId,
          username: user?.nickname || newUsername || "Anonymous",
          productId: product!.id,
          rating: newRating,
          message: newMessage,
        },
      ]);
      setNewMessage("");
      setNewRating(0);
      setNewUsername(null);
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

  return (
    <div className="flex flex-col justify-center items-center gap-5 px-2 md:px-0">
      <div className="flex justify-center items-center gap-5">
        <Card
          variant="outlined"
          sx={{
            width: "100%",
            maxWidth: 700,
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <div className="flex flex-row items-center justify-between gap-5">
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
            </div>
            <Divider />
            <div className="flex flex-col md:flex-row gap-6 mt-5">
              <img
                src={product.image}
                alt={product.title}
                className="w-full max-w-[280px] md:max-w-[320px] h-auto object-contain mx-auto"
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
                    defaultValue={1}
                    focused
                    inputProps={{ min: 1, max: 15, step: 1 }}
                    onChange={(val) => setQuantity(Number(val.target.value))}
                    disabled={inCartItems.some(
                      (item) => item.id === product.id,
                    )}
                  />
                  <IconButton
                    onClick={() => addToCart(product)}
                    color="primary"
                    aria-label="add to shopping cart"
                    disabled={inCartItems.some(
                      (item) => item.id === product.id,
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
                ({product.rating_count > 0 ? product.rating_count : 0})
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
            <Card
              variant="outlined"
              sx={{ width: "100%", maxWidth: 700, mt: 2 }}
            >
              <CardContent>
                <Typography variant="h6">Add your review:</Typography>
                <Rating
                  name="new-rating"
                  value={newRating}
                  precision={0.5}
                  onChange={(_, value) => setNewRating(value)}
                />
                <TextField
                  label="Username (optional)"
                  fullWidth
                  value={newUsername}
                  placeholder="Username (optional)"
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <TextField
                  label="Review"
                  fullWidth
                  multiline
                  rows={3}
                  value={newMessage}
                  placeholder="Your message..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  sx={{ mt: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={submitReview}
                >
                  Submit Review
                </Button>
              </CardContent>
            </Card>
            <List sx={{ mb: 2, width: "100%", maxWidth: 700 }}>
              {reviews.map(({ id, username, message, rating }) => (
                <React.Fragment key={id}>
                  <ListItemButton>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{ color: "text.primary", fontWeight: 600 }}
                        >
                          {username}
                        </Typography>
                      }
                      secondary={
                        <Typography sx={{ color: "text.primary" }}>
                          {message}
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
