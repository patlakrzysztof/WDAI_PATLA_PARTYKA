const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("library-db", "user", "password", {
  dialect: "sqlite",
  host: "./dev.sqlite",
});

module.exports = sequelize;
