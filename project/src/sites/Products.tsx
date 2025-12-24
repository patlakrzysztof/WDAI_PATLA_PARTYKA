import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useEffect, useState } from "react";

interface ShoppingCartItems {
  inCartItems: number;
  setInCartItems: (value: number | ((prev: number) => number)) => void;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

function Products({ inCartItems, setInCartItems }: ShoppingCartItems) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const mappedProducts: Product[] = data.map((product: Product) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          rating: {
            rate: product.rating.rate,
            count: product.rating.count,
          },
        }));
        setProducts(mappedProducts);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">
      {products.map((product) => (
        <Card variant="outlined" sx={{ maxWidth: 360 }}>
          <CardContent sx={{ p: 2 }}>
            <div className="flex flex-row items-center justify-between gap-5 mb-2">
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {product.price}$
              </Typography>
            </div>
            <Rating name="read-only" value={product.rating.rate} readOnly />(
            {product.rating.count})
            <Divider />
            <img
              src={product.image}
              alt={product.title}
              className="w-80 h-80 object-contain my-5 mb-5"
            />
            <Divider />
            <div className="flex flex-row items-center justify-between gap-5 mb-2">
              <Typography gutterBottom variant="h6" component="div">
                {product.category}
              </Typography>
              <IconButton
                onClick={() => setInCartItems((prev) => prev + 1)}
                color="primary"
                aria-label="add to shopping cart"
              >
                <AddShoppingCartIcon />
              </IconButton>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Products;
