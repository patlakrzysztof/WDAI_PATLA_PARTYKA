const express = require("express");
const Products = require("../models/products");
const Reviews = require("../models/reviews");

const router = express.Router();
router.use(express.json());

const cors = require("cors");

router.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

router.post("/", async (req, res) => {
  const review = req.body;
  if (!review.productId || !review.rating)
    return res.status(400).json({ error: "Part of the review is missing" });

  if (review.rating < 0.0 || review.rating > 5.0)
    return res
      .status(400)
      .json({ error: "the rating has to be between 0 and 5 stars" });

  const reviewerName = review.username || "Anonymous";

  try {
    const product = await Products.findOne({ where: { id: review.productId } });
    if (!product)
      return res.status(400).json({ error: "no products with this id" });

    const rev = await Reviews.create({
      productId: review.productId,
      username: reviewerName,
      message: review.message,
      rating: review.rating,
    });

    res.json({ reviewId: rev.id });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

router.get("/:productId", async (req, res) => {
  const productId = req.params.productId;
  if (!productId) return res.status(400).json({ error: "No productId given" });

  try {
    const product = await Products.findOne({ where: { id: productId } });
    if (!product)
      return res.status(400).json({ error: "no products with this id" });

    const reviews = await Reviews.findAll({ where: { productId: productId } });

    res.json(reviews);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

router.get("/rating/:productId", async (req, res) => {
  const productId = req.params.productId;
  if (!productId) return res.status(400).json({ error: "No productId given" });

  try {
    const product = await Products.findOne({ where: { id: productId } });
    if (!product)
      return res.status(400).json({ error: "no products with this id" });

    const reviews = await Reviews.findAll({ where: { productId: productId } });

    let sum = 0;
    let count = 0;
    reviews.forEach((review) => {
      sum += review.rating;
      count += 1;
    });

    const average = count > 0 ? sum / count : 0;

    res.json({
      average: average,
      count: count,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

module.exports = router;
