import {
  Card,
  CardContent,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  NativeSelect,
  Rating,
  TextField,
  Tooltip,
  tooltipClasses,
  Typography,
  Zoom,
  type TooltipProps,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import styled from "@emotion/styled";
import { useState } from "react";
import { Link } from "react-router-dom";

//types
import type { Product } from "../types";
import type { CartItem } from "../types";

interface ProductsProps {
  inCartItems: Map<number, CartItem>;
  setInCartItems: React.Dispatch<React.SetStateAction<Map<number, CartItem>>>;
  products: Product[];
}

function Products({ inCartItems, setInCartItems, products }: ProductsProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<
    "default" | "asc" | "desc" | "asc-rate" | "desc-rate"
  >("default");

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "#000000",
      maxWidth: 220,
      fontSize: "medium",
      border: "2px solid #dadde9",
    },
  }));

  const addToCart = (product: Product) => {
    setInCartItems((prev) => {
      const copy = new Map(prev);
      if (copy.has(product.id)) {
        return copy;
      } else {
        copy.set(product.id, { ...product, quantity: 1 });
        return copy;
      }
    });
  };

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      if (sort === "asc-rate") return a.rating.rate - b.rating.rate;
      if (sort === "desc-rate") return b.rating.rate - a.rating.rate;
      return 0;
    });

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  return (
    <div>
      <Card
        className="flex justify-center p-10 w-screen h-1/2"
        sx={{ backgroundColor: "primary.main" }}
      >
        <CardContent className="flex flex-col justify-center items-center gap-10">
          <Typography variant="h3" color="textSecondary">
            OUR PRODUCTS :
          </Typography>
        </CardContent>
      </Card>
      <div className="flex flex-row items-center justify-center p-10 gap-5">
        <TextField
          id="filter-by"
          label="Search"
          variant="standard"
          color="primary"
          onChange={(text) => setSearch(text.target.value)}
          sx={{
            input: {
              color: "black",
            },
            label: {
              color: "black",
            },
            width: {
              xs: "100%",
              sm: 250,
              md: 350,
            },
          }}
        />
        <FormControl
          sx={{
            minWidth: 160,
          }}
        >
          <InputLabel
            variant="standard"
            htmlFor="sort-input"
            sx={{ color: "black" }}
          >
            Filter
          </InputLabel>
          <NativeSelect
            defaultValue="sort-def"
            inputProps={{
              name: "sort",
              id: "sort-input",
            }}
            value={sort}
            onChange={(sortBy) =>
              setSort(sortBy.target.value as "default" | "asc" | "desc")
            }
          >
            <option value="default">Default</option>
            <option value="asc">Price Ascending</option>
            <option value="desc">Price Descending</option>
            <option value="asc-rate">Rating Ascending</option>
            <option value="desc-rate">Rating Descending</option>
          </NativeSelect>
        </FormControl>
      </div>
      <div className="flex flex-wrap gap-10 items-center justify-center p-5">
        {filteredProducts.map((product) => (
          <HtmlTooltip
            title={product.description}
            placement="right"
            slots={{
              transition: Zoom,
            }}
            slotProps={{
              transition: { timeout: 600 },
            }}
            key={product.id}
          >
            <Link to={`/products/${slugify(product.title)}`}>
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
                  <Rating
                    name="read-only"
                    value={product.rating.rate}
                    readOnly
                    className="mb-3"
                  />
                  ({product.rating.count})
                  <Divider />
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-80 h-80 object-contain my-5 mb-5"
                  />
                  <Divider />
                  <div className="flex items-center justify-start mb-2">
                    <Typography gutterBottom variant="h6" component="div">
                      {product.category}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </HtmlTooltip>
        ))}
      </div>
    </div>
  );
}

export default Products;
