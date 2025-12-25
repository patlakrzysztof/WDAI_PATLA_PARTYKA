import {
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

interface ShoppingCartItems {
  inCartItems: Set<Product>;
  setInCartItems: (
    value: Set<Product> | ((prev: Set<Product>) => Set<Product>)
  ) => void;
}

function ShoppingCart({ inCartItems, setInCartItems }: ShoppingCartItems) {
  return (
    <div className="flex flex-wrap gap-10 items-center justify-center p-5">
      {Array.from(inCartItems).map((product) => (
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
                defaultValue={1}
                id="quantity-input"
                sx={{ m: 1, width: "10ch" }}
                color="primary"
                focused
              />
              <IconButton
                onClick={() =>
                  setInCartItems((prev) => {
                    const copy = new Set(prev);
                    copy.delete(product);
                    return copy;
                  })
                }
                color="primary"
                aria-label="delete from shopping cart"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ShoppingCart;
