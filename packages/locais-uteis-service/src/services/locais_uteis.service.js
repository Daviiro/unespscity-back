const mongoose = require("mongoose");
const Locais_Uteis = require("../model/LocaisUteis");

module.exports = {
    name: "locais-uteis-service",
    version: 1,
    actions: {
        create: {
            params: {
                cityId: "number",
                street: "string",
                number: "number",
                referencePoint: "string",
                latitude: "number",
                longitude: "number",
                description: "string",
            },
            async handler(ctx) {
                const _id = mongoose.Types.ObjectId();
                if (ctx.params) {
                    if (ctx.params.street && ctx.params.number && ctx.params.referencePoint && ctx.params.latitude && ctx.params.longitude && ctx.params.description && ctx.params.images) {
                        return Locais_Uteis.create({
                            _id,
                            cityId: ctx.params.cityId,
                            street: ctx.params.street,
                            number: ctx.params.number,
                            referencePoint: ctx.params.referencePoint,
                            latitude: ctx.params.latitude,
                            longitude: ctx.params.longitude,
                            description: ctx.params.description,
                            images: ctx.params.images,
                        })
                    }
                }
                return false
            }
        },


        getAll: {
            async handler(ctx) {
                return await Locais_Uteis.find()
            }
        },

        getById: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Locais_Uteis.find({ _id: ctx.params.id })
                }
                return false
            }
        },

        update: {
            params: {
                street: "string",
                number: "number",
                referencePoint: "string",
                latitude: "number",
                longitude: "number",
                description: "string",
            },
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Locais_Uteis.updateOne({ _id: ctx.params.id }, { $set: {
                        street: ctx.params.street,
                        number: ctx.params.number,
                        referencePoint: ctx.params.referencePoint,
                        latitude: ctx.params.latitude,
                        longitude: ctx.params.longitude,
                        description: ctx.params.description,
                        images: ctx.params.images,
                    } });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Locais_Uteis.deleteOne({ _id: ctx.params.id })
                }
                return false
            }
        }
    }
}