import {
  Card,
  CardContent,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

//types
import type { Product } from "../types";
import type { CartItem } from "../types";

interface ShoppingCartProps {
  inCartItems: Map<number, CartItem>;
  setInCartItems: React.Dispatch<React.SetStateAction<Map<number, CartItem>>>;
}

function ShoppingCart({ inCartItems, setInCartItems }: ShoppingCartProps) {
  const handleQuantityChange = (product: CartItem, quantity: number) => {
    setInCartItems((prev) => {
      const copy = new Map(prev);
      const item = copy.get(product.id);
      if (item) {
        copy.set(product.id, { ...item, quantity });
      }
      return copy;
    });
  };

  const handleDelete = (productId: number) => {
    setInCartItems((prev) => {
      const copy = new Map(prev);
      copy.delete(productId);
      return copy;
    });
  };

  return (
    <div className="flex flex-wrap gap-10 items-center justify-center p-5">
      <Card
        className="flex justify-center p-10 w-screen h-1/2"
        sx={{ backgroundColor: "primary.main" }}
      >
        <CardContent className="flex flex-col justify-center items-center gap-10">
          <Typography variant="h3" color="textSecondary">
            YOUR SHOPPING CART :
          </Typography>
        </CardContent>
      </Card>
      {inCartItems.size > 0 ? (
        Array.from(inCartItems.values()).map((product) => (
          <Card variant="outlined" sx={{ maxWidth: 360 }}>
            <CardContent sx={{ p: 2 }}>
              <div className="flex flex-row items-center justify-between gap-5">
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {product.price}$
                </Typography>
              </div>
              <Divider />
              <img
                src={product.image}
                alt={product.title}
                className="w-80 h-80 object-contain my-5 mb-5"
              />
              <Divider />
              <div className="flex flex-row items-center justify-between gap-5 mb-2">
                <TextField
                  label="Quantity"
                  type="number"
                  value={product.quantity}
                  id="quantity-input"
                  sx={{ m: 1, width: "10ch" }}
                  color="primary"
                  focused
                  inputProps={{ min: 0, max: 15, step: 1 }}
                  onChange={(val) =>
                    handleQuantityChange(product, Number(val.target.value))
                  }
                />
                <IconButton
                  onClick={() => handleDelete(product.id)}
                  color="primary"
                  aria-label="delete from shopping cart"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h2" color="primary">
          Shopping Cart is Empty :(
        </Typography>
      )}
    </div>
  );
}

export default ShoppingCart;
