require("dotenv").config();
const express = require("express");
const sequelize = require("../database");
const Orders = require("../models/orders");

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
  const userId = req.user.id;
  if (!userId) return res.status(500).json({ error: "incorrect userID" });

  try {
    const orders = await Orders.findAll({ where: { userId: userId } });
    return res.json(orders);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.get("/:orderId", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  if (!userId) return res.status(500).json({ error: "incorrect userID" });

  const orderId = req.params.orderId;
  if (!orderId) return res.status(500).json({ error: "incorrect orderID" });

  try {
    const order = await Orders.findOne({
      where: {
        userId: userId,
        id: orderId,
      },
    });
    if (!order)
      return res.status(400).json({ error: "This user has no such order" });
    else return res.json(order);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderDate, items, address, contact } = req.body;
    console.log("BODY:", req.body);

    const newItem = await Orders.create({
      userId,
      orderDate,
      items,
      address,
      contact,
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
