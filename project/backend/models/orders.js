const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Orders = sequelize.define(
  "Orders",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sentDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    inDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    items: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        structureValidator(value) {
          if (!Array.isArray(value)) {
            throw new Error("Items must be an array");
          }
          for (const item of value) {
            if (
              !item.productId ||
              !item.productName ||
              !item.quantity ||
              !item.priceAtPurchase
            ) {
              throw new Error("Each item must have a productId and quantity");
            }
          }
        },
      },
    },
    address: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        structureValidator(value) {
          if (
            !value.country ||
            !value.city ||
            !value.zipCode ||
            !value.street ||
            !value.houseNumber
          ) {
            throw new Error(
              "Address must contain street, city, postalCode and houseNumber"
            );
          }
        },
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Orders;
