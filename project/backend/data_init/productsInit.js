const ProductsDB = require("../models/products");

async function fetchProducts() {
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

    console.log({ message: "Products imported" });
  } catch (err) {
    console.error({ "Importing products failed": err.message });
  }
}

module.exports = fetchProducts;
