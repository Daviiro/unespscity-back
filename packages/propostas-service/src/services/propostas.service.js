const Propostas = require("../model/Propostas")


module.exports = {
    name: "propostas-service",
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
                name: "string"
            },
            async handler(ctx) {
                return Propostas.create({
                    userId: ctx.params.userId,
                    street: ctx.params.street,
                    streetNumber: ctx.params.streetNumber,
                    referencePoint: ctx.params.referencePoint,
                    cityId: ctx.params.cityId,
                    latitude: ctx.params.latitude,
                    longitude: ctx.params.longitude,
                    description: ctx.params.description,
                    images: [ctx.params.images],
                    isResolved: false,
                    name: ctx.params.name
                })
            }
        },

        getAll: {
            async handler(ctx) {
                return await Propostas.find()
            }
        },

        getAllMarkers: {
            async handler(ctx) {
                return await Propostas.find({ isResolved: false }, "latitude longitude date")
            }
        },

        exists: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Propostas.exists({ _id: ctx.params.id })
                }
                return false
            }
        },

        update: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Propostas.updateOne({ _id: ctx.params.id }, {
                        $set: {
                            idCity: ctx.params.idCity,
                            name: ctx.params.name,
                            street: ctx.params.street,
                            streetNumber: ctx.params.streetNumber,
                            latitude: ctx.params.latitude,
                            longitude: ctx.params.longitude,
                            description: ctx.params.description,
                            images: ctx.params.images,
                            name: ctx.params.name
                        }
                    });
                }
                return false
            }
        },
        updateResolved: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Propostas.updateOne({ _id: ctx.params.id }, { $set: { isResolved: true } });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Propostas.deleteOne({ _id: ctx.params.id })
                }
                return false
            }
        }
    },
}