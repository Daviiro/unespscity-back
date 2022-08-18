"use strict";

const Sequelize = require("sequelize");

module.exports = {
    name: "menucidade",
    define: {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        cityId: { // id must always exist
            type: Sequelize.INTEGER,
            references: {
                model: 'cidades',
                key: 'id'
            },
        },

        menuId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'menus',
                key: 'id'
            }
        },
    },
    options: {
        timestamps: false
    }
};
