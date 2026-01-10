const express = require("express");
const sequelize = require("../database");
const ProductsDB = require("../models/products");
const bcrypt = require("bcryptjs");

sequelize.sync();

const app = express();
app.use(express.json());

app.listen(3002, (err) => {
  if (err) process.exit(1);
  console.log("Server running");
});

app.get("/api/products", async (req, res) => {
  const products = await ProductsDB.findAll();
  if (!products) {
    return res.status(400).json("Products not found");
  }
  res.json(products);
});

app.post("/", async (req, res) => {
  const product = await ProductsDB.create(req.body);
  res.status(201).json(product);
});
