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
                    if (ctx.params.data.lastTimeSeen && ctx.params.data.userId && ctx.params.data.cityId && ctx.params.data.street && ctx.params.data.number && ctx.params.data.latitude && ctx.params.data.longitude && ctx.params.data.description && ctx.params.data.images) {
                        return Animais_Perdidos.create({
                            _id,
                            lastTimeSeen: ctx.params.data.lastTimeSeen,
                            userId: ctx.params.data.userId,
                            cityId: ctx.params.data.cityId,
                            street: ctx.params.data.street,
                            number: ctx.params.data.number,
                            referencePoint: ctx.params.data.referencePoint,
                            latitude: ctx.params.data.latitude,
                            longitude: ctx.params.data.longitude,
                            description: ctx.params.data.description,
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
                if (ctx.params.data && ctx.params.id) {
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
                if (ctx.params.data && ctx.params.data.id) {
                    return await Animais_Perdidos.updateOne({ _id: ctx.params.id }, { $set: {
                        lastTimeSeen: ctx.params.data.lastTimeSeen,
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
                if (ctx.params.data && ctx.params.data.id) {
                    return await Animais_Perdidos.deleteOne({ _id: ctx.params.data.id })
                }
                return false
            }
        }
    }
}