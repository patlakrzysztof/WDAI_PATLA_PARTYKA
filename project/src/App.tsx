import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./index.css";

//icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeIcon from "@mui/icons-material/Home";
import { Badge } from "@mui/material";

// sites
import HomePage from "./sites/Home";
import ShoppingCart from "./sites/ShoppingCart";
import Products from "./sites/Products";
import { useState } from "react";

function App() {
  const [inCartItems, setInCartItems] = useState(0);

  return (
    <BrowserRouter>
      <nav className="px-5 py-5 flex justify-between">
        <div className="flex gap-5">
          <Link to="/">
            <HomeIcon />
          </Link>
          <Link to="/produkty">
            <StorefrontIcon />
          </Link>
        </div>
        <div>
          <Link to="/koszyk">
            <Badge badgeContent={inCartItems} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/koszyk"
          element={
            <ShoppingCart
              inCartItems={inCartItems}
              setInCartItems={setInCartItems}
            />
          }
        />
        <Route
          path="/produkty"
          element={
            <Products
              inCartItems={inCartItems}
              setInCartItems={setInCartItems}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
