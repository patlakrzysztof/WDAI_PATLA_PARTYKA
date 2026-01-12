const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  host: "./dev.sqlite",
});

module.exports = sequelize;
