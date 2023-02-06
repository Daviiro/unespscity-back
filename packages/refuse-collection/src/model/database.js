"use strict";

const Sequelize = require("sequelize");
const sequelize = new Sequelize({
	dialect: "mysql",
	host: "localhost",
	port: "3306", // Default for mysql => 3306
	database: "unespscity",
	username: "root",
	password: "",
});

module.exports = sequelize;