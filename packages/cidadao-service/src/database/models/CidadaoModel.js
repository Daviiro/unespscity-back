"use strict";

const Sequelize = require("sequelize");

module.exports = {
    name: "cidadao",
    define: {
        id: { // id must always exist
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        mobilePhone: {
            type: Sequelize.CHAR(14),
            allowNull: false,
            unique: true
        },

        isAdmin: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },

        panicButton: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },

        cityId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'cidades',
                key: 'id'
            }
        },
    },
    options: {
        timestamps: false
    }
};
