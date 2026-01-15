require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("../database");

const usersRoutes = require("./usersAPI");
const productsRoutes = require("./productsAPI");
const cartRoutes = require("./cartAPI");
const ordersRoutes = require("./ordersAPI");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/orders", ordersRoutes);

sequelize.sync().then(() => {
  app.listen(3002, () => {
    console.log("Server running on port 3002");
  });
});
