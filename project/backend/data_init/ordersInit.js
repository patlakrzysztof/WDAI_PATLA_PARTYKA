const Orders = require("../models/orders");
const Users = require("../models/users");

async function ordersInit() {
  const usersEmail = [
    "mjarosz@agh.edu.pl",
    "mpartyka@student.agh.edu.pl",
    "kpatla@student.agh.edu.pl",
  ];

  try {
    for (const mail of usersEmail) {
      const user = await Users.findOne({ where: { mail: mail } });
      if (!user) {
        continue;
      }

      await Orders.create({
        userId: user.id,
        orderDate: new Date(new Date().setDate(new Date().getDate() - 2)),
        sentDate: new Date(new Date().setDate(new Date().getDate() - 1)),
        items: [
          {
            productId: 1,
            productName: "Backpack",
            quantity: 1,
            priceAtPurchase: 109.95,
          },
          {
            productId: 2,
            productName: "Shoes",
            quantity: 2,
            priceAtPurchase: 39.99,
          },
        ],
        shipment: 10,
        address: {
          country: "Poland",
          city: "Krakow",
          zipCode: "30-059",
          street: "Mickiewicza",
          houseNumber: "30",
        },
        contact: "+48 123456789",
      });

      await Orders.create({
        userId: user.id,
        orderDate: new Date("2025-12-01"),
        sentDate: new Date("2025-12-02"),
        inDate: new Date("2025-12-05"),
        items: [
          {
            productId: 3,
            productName: "Mens Cotton Jacket",
            quantity: 1,
            priceAtPurchase: 55.99,
          },
        ],
        shipment: 15,
        address: {
          country: "Poland",
          city: "Warsaw",
          zipCode: "00-001",
          street: "Marszalkowska",
          houseNumber: "1",
        },
        contact: "+48 123456789",
      });

      await Orders.create({
        userId: user.id,
        orderDate: new Date("2025-11-15"),
        sentDate: new Date("2025-11-16"),
        inDate: new Date("2025-11-20"),
        items: [
          {
            productId: 5,
            productName: "Chain Bracelet",
            quantity: 2,
            priceAtPurchase: 695.0,
          },
        ],
        shipment: 10,
        address: {
          country: "Poland",
          city: "Krakow",
          zipCode: "30-059",
          street: "Mickiewicza",
          houseNumber: "30",
        },
        contact: "+48 123456789",
      });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = ordersInit;
