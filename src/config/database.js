const Sequelize = require("sequelize");
const db = new Sequelize({
    dialect: "sqlite",
    host: "./dev.sqlite"
});

module.exports = db;