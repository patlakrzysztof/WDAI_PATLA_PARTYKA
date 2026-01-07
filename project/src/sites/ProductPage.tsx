import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";

//types
import type { CartItem, Product } from "../types";

interface ProductPageProps {
  inCartItems: Map<number, CartItem>;
  setInCartItems: React.Dispatch<React.SetStateAction<Map<number, CartItem>>>;
  products: Product[];
}

function ProductPage({
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

  const addToCart = (product: Product) => {
    setInCartItems((prev) => {
      const copy = new Map(prev);
      if (copy.has(product.id)) {
        return copy;
      } else {
        copy.set(product.id, { ...product, quantity: quantity });
        return copy;
      }
    });
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
                {inCartItems.has(product.id) && (
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
                  disabled={inCartItems.has(product.id)}
                />
                <IconButton
                  onClick={() => addToCart(product)}
                  color="primary"
                  aria-label="add to shopping cart"
                  disabled={inCartItems.has(product.id)}
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
                value={product.rating.rate}
                readOnly
                className="mb-3"
              />
              ({product.rating.count})
            </div>
            <Typography gutterBottom variant="h4" component="div">
              {product.price}$
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductPage;
