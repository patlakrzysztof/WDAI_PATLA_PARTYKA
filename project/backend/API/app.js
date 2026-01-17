require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("../database");

const usersRoutes = require("./usersAPI");
const productsRoutes = require("./productsAPI");
const cartRoutes = require("./cartAPI");
const ordersRoutes = require("./ordersAPI");

const ProductsDB = require("../models/products");
const Users = require("../models/users");
const Orders = require("../models/orders");

const fetchProducts = require("../data_init/productsInit");
const usersInit = require("../data_init/usersInit");
const ordersInit = require("../data_init/ordersInit");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/orders", ordersRoutes);

sequelize.sync().then(async () => {
  app.listen(3002, () => {
    console.log("Server running on port 3002");
  });

  const productsCount = await ProductsDB.count();
  if (productsCount === 0) await fetchProducts();

  const usersCount = await Users.count();
  if (usersCount === 0) await usersInit();

  const ordersCount = await Orders.count();
  if (ordersCount === 0) await ordersInit();
});
