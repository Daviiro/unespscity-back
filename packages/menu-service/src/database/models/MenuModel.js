"use strict";

const Sequelize = require("sequelize");

module.exports = {
    name: "menu",
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

        logo: {
            type: Sequelize.STRING,
            allowNull: false
        },

        subTitle: {
            type: Sequelize.STRING,
            allowNull: false
        },
    },
    options: {
        timestamps: false
    }
};
