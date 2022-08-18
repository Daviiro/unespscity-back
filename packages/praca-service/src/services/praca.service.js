const Praca = require("../model/Praca")

module.exports = {
    name: "praca-service",
    actions: {
        create: {
            params: {
                name: "string",
                street: "string",
                number: "number",
                cityId: "number",
                latitude: "string",
                longitude: "string",
                description: "string",

            },
            async handler(ctx) {

                if (ctx.params) {
                    if (ctx.params.name && ctx.params.street && ctx.params.number && ctx.params.cityId && ctx.params.latitude && ctx.params.longitude && ctx.params.description && ctx.params.images) {
                        return Praca.create({
                            name: ctx.params.name,
                            street: ctx.params.street,
                            number: ctx.params.number,
                            cityId: ctx.params.cityId,
                            latitude: ctx.params.latitude,
                            longitude: ctx.params.longitude,
                            description: ctx.params.description,
                            images: ctx.params.images,
                            isResolved: false
                        })
                    }
                }
                return false
            }
        },

        getAll: {
            async handler(ctx) {
                return await Praca.find()
            }
        },

        exists: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Praca.exists({ _id: ctx.params.id })
                }
                return false
            }
        }
    }

}