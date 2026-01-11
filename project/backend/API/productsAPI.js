const express = require("express");
const sequelize = require("../database");
const ProductsDB = require("../models/products");

sequelize.sync();

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.listen(3003, (err) => {
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
      title == null ||
      price == null ||
      description == null ||
      category == null ||
      image == null ||
      rating_rate == null ||
      rating_count == null
    ) {
      return res.status(400).json({ error: "Wrong Data" });
    }
    const newProduct = await Product.create({
      title,
      price,
      description,
      category,
      image,
      rating_rate,
      rating_count,
    });
    res.status(201).json({ id: newProduct.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/products/:id", async (req, res) => {
  try {
    const product = await ProductsDB.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.update(req.body);
    res.json(product);
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

app.post("/api/fetch-products", async (req, res) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    for (const p of products) {
      await ProductsDB.create({
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        image: p.image,
        rating_rate: p.rating?.rate ?? 0,
        rating_count: p.rating?.count ?? 0,
      });
    }

    res.json({ message: "Products imported" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
