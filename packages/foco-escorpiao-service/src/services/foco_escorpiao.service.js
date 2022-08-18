const mongoose = require("mongoose");
const Foco_Escorpiao = require("../model/FocoEscorpiao");

module.exports = {
    name: "foco-escorpiao-service",
    version: 1,
    actions: {
        create: {
            params: {
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
                    if (ctx.params.street && ctx.params.number && ctx.params.referencePoint && ctx.params.latitude && ctx.params.longitude && ctx.params.description && ctx.params.images) {
                        return Foco_Escorpiao.create({
                            _id,
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
                return await Foco_Escorpiao.find()
            }
        },

        getById: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Foco_Escorpiao.find({ _id: ctx.params.id })
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
                    return await Foco_Escorpiao.updateOne({ _id: ctx.params.id }, { $set: {
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
                    return await Foco_Escorpiao.updateOne({ _id: ctx.params.id }, { $set: { isResolved: true } });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Foco_Escorpiao.deleteOne({ _id: ctx.params.id })
                }
                return false
            }
        }
    }
}