import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "./sites/Home";
import ShoppingCart from "./sites/ShoppingCart";
import Products from "./sites/Products";

function App() {
  return (
    <BrowserRouter>
      <nav className="px-4 py-2">
        <Link to="/">Strona Główna</Link> | <Link to="/koszyk">Koszyk</Link> |{" "}
        <Link to="/produkty">Produkty</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/koszyk" element={<ShoppingCart />} />
        <Route path="/produkty" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
