const Reviews = require("../models/reviews");
const Products = require("../models/products");

async function reviewsInit() {
  const guestNicknames = [
    "CoolGuy123",
    "HappyCustomer",
    "Shopaholic",
    "SneakerFan",
    "RandomUser",
    "Buyer2025",
    "NiceDeal",
  ];

  const messages = [
    "Great product!",
    "Very good quality",
    "Worth the price",
    "Could be better",
    "I am satisfied",
    "Not what I expected",
    "Amazing!",
    "Pretty average",
    "Would buy again",
  ];

  try {
    const products = await Products.findAll();

    for (const product of products) {
      const reviewsCount = Math.floor(Math.random() * 5) + 1;

      for (let i = 0; i < reviewsCount; i++) {
        const rating = parseFloat((Math.random() * 4).toFixed(1) + 1);
        const message = messages[Math.floor(Math.random() * messages.length)];
        const isAnonymous = Math.random() < 0.75;
        const username = isAnonymous
          ? "Anonymous"
          : guestNicknames[Math.floor(Math.random() * guestNicknames.length)];

        await Reviews.create({
          productId: product.id,
          username,
          message,
          rating,
        });
      }
    }
  } catch (err) {
    console.log("Error initializing reviews:", err);
  }
}

module.exports = reviewsInit;
