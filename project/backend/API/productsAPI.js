const express = require("express");
const sequelize = require("../database");
const ProductsDB = require("../models/products");

const router = express.Router();
router.use(express.json());

const cors = require("cors");
router.use(cors());

router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
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
    const newProduct = await ProductsDB.create({
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

router.patch("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

module.exports = router;
