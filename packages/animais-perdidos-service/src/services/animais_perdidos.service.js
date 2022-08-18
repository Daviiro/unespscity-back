const mongoose = require("mongoose");
const Animais_Perdidos = require("../model/AnimaisPerdidos")

module.exports = {
    name: "animais-perdidos-service",
    version: 1,
    actions: {
        create: {
            params: {
                lastTimeSeen: "string",
                userId: "number",
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
                const timeElapsed = Date.now();
                const today = new Date(timeElapsed);
                if (ctx.params) {
                    if (ctx.params.lastTimeSeen && ctx.params.street && ctx.params.number && ctx.params.referencePoint && ctx.params.latitude && ctx.params.longitude && ctx.params.description && ctx.params.images) {
                        return Animais_Perdidos.create({
                            _id,
                            lastTimeSeen: ctx.params.lastTimeSeen,
                            userId: ctx.params.userId,
                            cityId: ctx.params.cityId,
                            street: ctx.params.street,
                            number: ctx.params.number,
                            referencePoint: ctx.params.referencePoint,
                            latitude: ctx.params.latitude,
                            longitude: ctx.params.longitude,
                            description: ctx.params.description,
                            images: ctx.params.images,
                            date: today,
                            isResolved: false
                        })
                    }
                }
                return false
            }
        },


        getAll: {
            async handler(ctx) {
                return await Animais_Perdidos.find()
            }
        },

        getById: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Animais_Perdidos.find({ _id: ctx.params.id })
                }
                return false
            }
        },

        update: {
            params: {
                lastTimeSeen: "string",
                street: "string",
                number: "number",
                referencePoint: "string",
                latitude: "number",
                longitude: "number",
                description: "string",
            },
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Animais_Perdidos.updateOne({ _id: ctx.params.id }, { $set: {
                        lastTimeSeen: ctx.params.lastTimeSeen,
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

        updateResolved: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Animais_Perdidos.updateOne({ _id: ctx.params.id }, { $set: { isResolved: true } });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Animais_Perdidos.deleteOne({ _id: ctx.params.id })
                }
                return false
            }
        }
    }
}