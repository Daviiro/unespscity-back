"use strict";

const Database = require("../adapters/Database");
const passwordHash = require('password-hash');

// Filters applied when searching for entities
// Elements correspond to the columns of the table
const Filters_Submenu = {
    full: ["id", "name", "menuId", "logo", "type"],
    restricted: ["name"],
};

module.exports = {
    name: "submenu-service",

    actions: {

        create: {
            params: {
                name: "string",
                menuId: "number",
                logo: "string",
                type: "string"
            },
            handler(ctx) {
                console.log(ctx.params);
                return this.DB_Submenu.insert(ctx, {
                    name: ctx.params.name,
                    menuId: ctx.params.menuId,
                    logo: ctx.params.logo,
                    type: ctx.params.type
                })
                    .then(() => {
                        console.log("SubMenu Created: ", ctx.params.name);
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
                return this.DB_Submenu.find(ctx, {})
                    .then((res) => { console.log("Search Complete", res.data); return res.data })
                    .catch((err) => {
                        console.log("error: " + err);
                        return []
                    });
            }
        },

        getSubMenu: {
            params: {
                menuId: "string"
            },
            handler(ctx) {
                return this.DB_Submenu.find(ctx, { query: { menuId: ctx.params.menuId } })
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
        this.DB_Submenu = new Database("Submenu", Filters_Submenu.full);
    }
};
