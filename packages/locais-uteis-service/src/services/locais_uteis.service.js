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
                    if (ctx.params.data.cityId && ctx.params.data.street && ctx.params.data.number && ctx.params.data.latitude && ctx.params.data.longitude && ctx.params.data.description && ctx.params.data.images) {
                        return Locais_Uteis.create({
                            _id,
                            cityId: ctx.params.data.cityId,
                            street: ctx.params.data.street,
                            number: ctx.params.data.number,
                            referencePoint: ctx.params.data.referencePoint,
                            latitude: ctx.params.data.latitude,
                            longitude: ctx.params.data.longitude,
                            description: ctx.params.data.description,
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
                if (ctx.params.data && ctx.params.id) {
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
                if (ctx.params.data && ctx.params.data.id) {
                    return await Locais_Uteis.updateOne({ _id: ctx.params.id }, { $set: {
                        street: ctx.params.data.street,
                        number: ctx.params.data.number,
                        referencePoint: ctx.params.data.referencePoint,
                        latitude: ctx.params.data.latitude,
                        longitude: ctx.params.data.longitude,
                        description: ctx.params.data.description,
                        images: ctx.params.data.images,
                    } });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params.data && ctx.params.data.id) {
                    return await Locais_Uteis.deleteOne({ _id: ctx.params.data.id })
                }
                return false
            }
        }
    }
}