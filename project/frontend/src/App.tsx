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
import ProfilePage from "./sites/profile/ProfilePage";

//types
import type { Product, User } from "./types";
import type { CartItem } from "./types";
import OrderSite from "./sites/OrderSite";

function App() {
  const [inCartItems, setInCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("http://localhost:3002/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data);
        const mappedProducts: Product[] = data.map((product: Product) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
        }));
        setProducts(mappedProducts);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3002/users/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:3002/api/cart`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const mapped: CartItem[] = data.map((item: any) => ({
          id: item.productId,
          title: item.product.title,
          price: item.product.price,
          description: item.product.description,
          category: item.product.category,
          image: item.product.image,
          quantity: item.quantity,
          rating_rate: item.product.rating_rate,
          rating_count: item.product.rating_count,
        }));
        setInCartItems(mapped);
      })
      .catch((err) => console.error(err));
  }, [user]);

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
          {user ? (
            <Link to="/cart">
              <Badge badgeContent={inCartItems.length} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </Link>
          ) : (
            <Link to="/profile">
              <Badge badgeContent={inCartItems.length} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </Link>
          )}
          <Link to="/profile">
            <Avatar alt="avatar image" sx={{ width: 25, height: 25 }} />
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/your-order"
          element={
            <OrderSite
              user={user}
              inCartItems={inCartItems}
              setInCartItems={setInCartItems}
            />
          }
        />
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
              user={user}
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
