"use strict";

const Database = require("../adapters/Database");
const passwordHash = require('password-hash');

// Filters applied when searching for entities
// Elements correspond to the columns of the table
const Filters_Cidadadao = {
    full: ["id", "name", "logo", "subTitle"],
    restricted: ["name"],
};

module.exports = {
    name: "menu-service",

    actions: {

        create: {
            params: {
                name: "string",
                logo: "string",
                subTitle: "string"
            },
            handler(ctx) {
                return this.DB_Menu.insert(ctx, {
                    name: ctx.params.name,
                    logo: ctx.params.logo,
                    subTitle: ctx.params.subTitle
                })
                    .then(() => {
                        console.log("Menu Created: ", ctx.params.name);
                        return "ok"
                    })
                    .catch((err) => {
                        console.log(err);
                        return "error"
                    });
            }
        },

        getAll: {
            params: {

            },
            handler(ctx) {
                return this.DB_Menu.find(ctx, {})
                    .then((res) => { console.log("Search Complete", res.data); return res.data })
                    .catch((err) => {
                        console.log("error: " + err);
                        return []
                    });
            }
        },

    },
    methods: {
    },
    created() {
        this.DB_Menu = new Database("Menu", Filters_Cidadadao.full);
    }
};
