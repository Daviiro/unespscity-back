"use strict";

const Sequelize = require("sequelize");

module.exports = {
    name: "submenu",
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

        menuId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'menus',
                key: 'id'
            }
        },

        logo: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        type: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    options: {
        timestamps: false
    }
};
