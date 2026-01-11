import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";

//icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeIcon from "@mui/icons-material/Home";
import { Avatar, Badge } from "@mui/material";

// sites
import HomePage from "./sites/Home";
import ShoppingCart from "./sites/ShoppingCart";
import Products from "./sites/Products";
import ProductPage from "./sites/ProductPage";
import OrderDetails from "./sites/OrderDetails";

//types
import type { Product } from "./types";
import type { CartItem } from "./types";
import ProfilePage from "./sites/profile/Profile";

function App() {
  const [inCartItems, setInCartItems] = useState<Map<number, CartItem>>(
    new Map()
  );
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
    <BrowserRouter>
      <nav className="px-5 py-5 flex justify-between">
        <div className="flex gap-5">
          <Link to="/">
            <HomeIcon />
          </Link>
          <Link to="/products">
            <StorefrontIcon />
          </Link>
        </div>
        <div className="flex flex-row gap-5">
          <Link to="/cart">
            <Badge badgeContent={inCartItems.size} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </Link>

          <Link to="/profile">
            <Avatar alt="avatar image" sx={{ width: 25, height: 25 }} />
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/cart"
          element={
            <ShoppingCart
              inCartItems={inCartItems}
              setInCartItems={setInCartItems}
            />
          }
        />
        <Route path="/products" element={<Products products={products} />} />
        <Route
          path="/products/:productName"
          element={
            <ProductPage
              inCartItems={inCartItems}
              setInCartItems={setInCartItems}
              products={products}
            />
          }
        />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
