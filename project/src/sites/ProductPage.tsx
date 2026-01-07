import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import products from "./Products";

//types
import type { Product } from "../types";

function ProductPage() {
  const { productId } = useParams();
  const product = products;
  return <div>{productId}</div>;
}

export default ProductPage;
