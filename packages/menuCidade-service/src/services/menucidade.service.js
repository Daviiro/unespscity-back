"use strict";

const Database = require("../adapters/Database");
const passwordHash = require('password-hash');

// Filters applied when searching for entities
// Elements correspond to the columns of the table
const Filters_MenuCidade = {
    full: ["id", "cityId", "menuId"],
    restricted: ["cityId"],
};

module.exports = {
    name: "menucidade-service",
    dependencies: [
    ],
    actions: {

        create: {
            params: {
                cityId: "number",
                menuId: "number"
            },
            handler(ctx) {
                return this.DB_MenuCidade.findOne(ctx, { query: { cityId: ctx.params.cityId, menuId: ctx.params.menuId } })
                    .then((res) => { console.log(res); return "Já Cadastrado" })
                    .catch((err) => {
                        if (err.name == 'Nothing Found')
                            this.DB_MenuCidade.insert(ctx, {
                                cityId: ctx.params.cityId,
                                menuId: ctx.params.menuId
                            })
                                .then(() => {
                                    console.log("MenuCidade Created: ", ctx.params.cityId);
                                    return "ok"
                                })
                                .catch((err) => {
                                    console.log(err);
                                    return "error"
                                });
                        else return err
                    });

            }
        },

        getOne: {
            params: {
                cityId: "number",
                menuId: "number"
            },
            handler(ctx) {
                return this.DB_MenuCidade.findOne(ctx, { query: { cityId: ctx.params.cityId, menuId: ctx.params.menuId } })
                    .then((res) => { console.log("Search Complete", res); return res.data })
                    .catch((err) => {
                        console.log(err);
                        return []
                    });
            }
        },

        getMenuCidade: {
            params: {
                cityId: "string"
            },
            handler(ctx) {
                return this.DB_MenuCidade.rawQuery(ctx, "Select menus.* from menucidades INNER JOIN menus on menus.id = menucidades.menuId WHERE menucidades.cityId = " + ctx.params.cityId + " ORDER BY menus.id")
                    .then((res) => { console.log(res); return res.data })
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
        this.DB_MenuCidade = new Database("MenuCidade", Filters_MenuCidade.full);
    }
};
