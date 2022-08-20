const mongoose = require("mongoose");
const Adocao_Animais = require("../model/AdocaoAnimais");

module.exports = {
    name: "adocao-animais-service",
    version: 1,
    actions: {
        create: {
            params: {
                userId: "number",
                cityId: "number",
                owner: "string",
                description: "string",
            },
            async handler(ctx) {
                const _id = mongoose.Types.ObjectId();
                const timeElapsed = Date.now();
                const today = new Date(timeElapsed);
                if (ctx.params) {
                    if (ctx.params.data.userId && ctx.params.data.cityId && ctx.params.data.owner && ctx.params.data.description && ctx.params.data.images) {
                        return Adocao_Animais.create({
                            _id,
                            userId: ctx.params.data.userId,
                            cityId: ctx.params.data.cityId,
                            owner: ctx.params.data.owner,
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
                return await Adocao_Animais.find()
            }
        },

        getById: {
            async handler(ctx) {
                if (ctx.params.data && ctx.params.id) {
                    return await Adocao_Animais.find({ _id: ctx.params.id })
                }
                return false
            }
        },

        update: {
            params: {
                owner: "string",
                description: "string",
            },
            async handler(ctx) {
                if (ctx.params.data && ctx.params.data.id) {
                    return await Adocao_Animais.updateOne({ _id: ctx.params.data.id }, { $set: {
                        owner: ctx.params.data.owner,
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
                    return await Adocao_Animais.updateOne({ _id: ctx.params.id }, { $set: { isResolved: true } });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params.data && ctx.params.data.id) {
                    return await Adocao_Animais.deleteOne({ _id: ctx.params.data.id })
                }
                return false
            }
        }
    }
}