require("dotenv").config();
const jwtKey = process.env.JWT_SECRET;
const express = require("express");
const sequelize = require("../database");
const CartDB = require("../models/cart");
const ProductsDB = require("../models/products");

const router = express.Router();
router.use(express.json());

const cors = require("cors");
const authenticateToken = require("../util/tokenAuth");

router.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await CartDB.findAll({ where: { userId } });

    const itemsWithProducts = await Promise.all(
      items.map(async (item) => {
        const product = await ProductsDB.findByPk(item.productId);
        return { ...item.dataValues, product };
      })
    );

    res.json(itemsWithProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    console.log("BODY:", req.body);

    const existing = await CartDB.findOne({ where: { userId, productId } });
    if (existing) {
      return res.json(existing);
    }

    const newItem = await CartDB.create({ userId, productId, quantity });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;
    let { quantity } = req.body;

    const item = await CartDB.findOne({ where: { userId, productId } });
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.quantity = quantity;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const item = await CartDB.findOne({ where: { userId, productId } });
    if (!item) return res.status(404).json({ error: "Item not found" });

    await item.destroy();
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
