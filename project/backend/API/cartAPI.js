const express = require("express");
const sequelize = require("../database");
const CartDB = require("../models/cart");
const ProductsDB = require("../models/products");

sequelize.sync();

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.listen(3004, (err) => {
  if (err) process.exit(1);
  console.log("Server running");
});

app.get("/api/cart/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
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

app.post("/api/cart", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
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

app.patch("/api/cart/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
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

app.delete("/api/cart/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const item = await CartDB.findOne({ where: { userId, productId } });
    if (!item) return res.status(404).json({ error: "Item not found" });

    await item.destroy();
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
