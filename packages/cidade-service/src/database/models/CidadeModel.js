"use strict";

const Sequelize = require("sequelize");

module.exports = {
    name: "cidade",
    define: {
        id: { // id must always exist
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
    },
    options: {
        timestamps: false
    }
};
