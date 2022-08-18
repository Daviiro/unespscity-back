"use strict";

const Database = require("../adapters/Database");
const passwordHash = require('password-hash');
var verifyPassword = require('../../node_modules/password-hash/lib/password-hash');

// Filters applied when searching for entities
// Elements correspond to the columns of the table
const Filters_Cidadadao = {
    full: ["id", "name", "password", "email", "mobilePhone", "cityId", "panicButton", "isAdmin"],
    restricted: ["name"],
};

module.exports = {
    name: "cidadao-service",

    actions: {

        create: {
            params: {
                name: "string",
                password: "string",
                email: "string",
                mobilePhone: "string",
                cityId: "number"
            },
            handler(ctx) {
                return this.generateHash(ctx.params.password)
                    .then((res) => this.DB_Cidadaos.insert(ctx, {
                        name: ctx.params.name,
                        password: res,
                        email: ctx.params.email,
                        mobilePhone: ctx.params.mobilePhone,
                        cityId: ctx.params.cityId,
                        panicButton: ctx.params.panicButton,
                        isAdmin: ctx.params.isAdmin,
                    }))
                    .then(() => {
                        console.log("User Account Created", ctx.params.name);
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
                return this.DB_Cidadaos.find(ctx, {})
                    .then((res) => {
                        console.log("Search Complete", res.data);
                        return res.data
                    })
                    .catch((err) => {
                        console.log("error: " + err);
                        return []
                    });
            }
        },

        updatePanicButton: {
            async handler(ctx) {
                if (ctx.params) {
                    return await this.DB_Cidadaos.updateOne({ _id: ctx.params.id }, { $set: { panicButton: true } });
                }
                return false
            }
        },

        login: {
            params: {
                email: "string",
                password: "string",
            },
            async handler(ctx) {
                const user = await this.DB_Cidadaos.findOne(ctx, {
                    query: {
                        email: ctx.params.email,
                    }
                });
                const verifyPass = verifyPassword.verify(ctx.params.password, user.data.password)
                if (verifyPass) {
                    return {
                        status: 200,
                        data: user
                    }
                }
                return {
                    status: 400,
                    error: "err"
                }
            }
        },

    },
    methods: {
        generateHash(value) {
            return Promise.resolve(passwordHash.generate(value, { algorithm: 'sha256' }))
                .then((res) => {
                    console.log("Password Encrypted", res)
                    return res
                });
        },
    },
    created() {
        this.DB_Cidadaos = new Database("Cidadao", Filters_Cidadadao.full);
    }
};
