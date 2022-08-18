const Filme = require("../model/Filme")

module.exports = {
    name: "catalogo-service",
    version: 1,
    actions: {
        create: {
            async handler(ctx) {
                if (ctx.params) {
                    if (ctx.params.nome && ctx.params.sinopse) {
                        return Filme.create({
                            nome: ctx.params.nome,
                            sinopse: ctx.params.sinopse
                        })
                    }
                }
                return false
            }
        },

        list: {
            async handler(ctx) {
                return await Filme.find()
            }
        },

        exists: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Filme.exists({ _id: ctx.params.id })
                }
                return false
            }
        }
    }

}