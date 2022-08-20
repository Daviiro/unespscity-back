const Anticorrupcao = require("../model/Anticorrupcao")


module.exports = {
    name: "anticorrupcao-service",
    actions: {
        create: {
            params: {
                userId: "number",
                street: "string",
                streetNumber: "number",
                referencePoint: "string",
                cityId: "number",
                latitude: "number",
                longitude: "number",
                description: "string",

            },
            async handler(ctx) {
                return Anticorrupcao.create({
                    userId: ctx.params.userId,
                    street: ctx.params.street,
                    streetNumber: ctx.params.streetNumber,
                    referencePoint: ctx.params.referencePoint,
                    cityId: ctx.params.cityId,
                    latitude: ctx.params.latitude,
                    longitude: ctx.params.longitude,
                    description: ctx.params.description,
                    images: [ctx.params.images],
                    isResolved: false
                })
            }
        },

        getAll: {
            async handler(ctx) {
                return await Anticorrupcao.find()
            }
        },

        getAllMarkers: {
            async handler(ctx) {
                return await Anticorrupcao.find({ isResolved: false }, "latitude longitude date")
            }
        },

        exists: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Anticorrupcao.exists({ _id: ctx.params.id })
                }
                return false
            }
        },

        update: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Anticorrupcao.updateOne({ _id: ctx.params.id }, {
                        $set: {
                            idCity: ctx.params.idCity,
                            name: ctx.params.name,
                            street: ctx.params.street,
                            streetNumber: ctx.params.streetNumber,
                            latitude: ctx.params.latitude,
                            longitude: ctx.params.longitude,
                            description: ctx.params.description,
                            images: ctx.params.images
                        }
                    });
                }
                return false
            }
        },
        updateResolved: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Anticorrupcao.updateOne({ _id: ctx.params.id }, { $set: { isResolved: true } });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Anticorrupcao.deleteOne({ _id: ctx.params.id })
                }
                return false
            }
        }
    },
}