import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface ShoppingCartItems {
  inCartItems: number;
  setInCartItems: React.Dispatch<React.SetStateAction<number>>;
}

function Products({ inCartItems, setInCartItems }: ShoppingCartItems) {
  return (
    <button onClick={() => setInCartItems((prev) => prev + 1)}>
      <IconButton color="primary" aria-label="add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton>
    </button>
  );
}

export default Products;
