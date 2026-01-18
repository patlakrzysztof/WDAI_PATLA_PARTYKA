const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const CartDB = sequelize.define(
  "CartDB",
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
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 15,
      },
    },
  },
  {
    timestamps: false,
  },
);

module.exports = CartDB;
