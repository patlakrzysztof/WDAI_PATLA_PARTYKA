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
  try {
    const products = await ProductsDB.findAll();
    if (!products) {
      return res.status(404).json("Products not found");
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await ProductsDB.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      category,
      image,
      rating_rate,
      rating_count,
    } = req.body;
    if (
      !title ||
      !price ||
      !description ||
      !category ||
      !image ||
      !rating_rate ||
      !rating_count
    ) {
      return res.status(400).json({ error: "Wrong Data" });
    }
    const newBook = await Book.create({
      title,
      price,
      description,
      category,
      image,
      rating_rate,
      rating_count,
    });
    res.status(201).json({ id: newBook.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await ProductsDB.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
