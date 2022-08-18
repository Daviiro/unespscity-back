"use strict";

const Database = require("../adapters/Database");
const passwordHash = require('password-hash');

// Filters applied when searching for entities
// Elements correspond to the columns of the table
const Filters_Cidadadao = {
    full: ["id", "name", "password", "email", "mobilePhone", "cityId"],
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
                        cityId: ctx.params.cityId
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

        login: {
            params: {
                email: "string",
                password: "string",
            },
            handler(ctx) {
                return this.DB_Cidadaos.findOne(ctx, {
                    query: {
                        email: ctx.params.email,
                    }
                })
                    .then((res) => {
                        const verifyPass = passwordHash.verify(ctx.params.password, res.data.password)
                        console.log(res.data.password, verifyPass);
                        if (verifyPass) {
                            const retorno = {
                                status: 200,
                                user: {
                                    name: res.data.name,
                                    email: res.data.email,
                                    token: "asdmkwe2ek2nkr32",
                                    mobilePhone: res.data.mobilePhone,
                                    cityId: res.data.cityId
                                }
                            }
                            console.log("User Account loged: ", ctx.params.email);
                            return retorno
                        }
                        return {
                            status: 200,
                            user: {
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        return {
                            status: 400,
                            user: {
                            },
                            error: err
                        }
                    });
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
