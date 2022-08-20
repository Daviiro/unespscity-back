const mongoose = require("mongoose");
const Tumulos = require("../model/Tumulos");

module.exports = {
    name: "tumulo-service",
    version: 1,
    actions: {
        create: {
            params: {
                userId: "number",
                cityId: "number",
                dateOfDeath: "date",
                graveyardName: "string",
                graveNumber: "number",
                QRCode: "string",
            },
            async handler(ctx) {
                const _id = mongoose.Types.ObjectId();
                if (ctx.params) {
                    if (ctx.params.data.userId && ctx.params.data.cityId && ctx.params.data.dateOfDeath && ctx.params.data.graveyardName && ctx.params.data.graveNumber && ctx.params.data.QRCode && ctx.params.data.QRimage) {
                        return Tumulos.create({
                            _id,
                            userId: ctx.params.data.userId,
                            cityId: ctx.params.data.cityId,
                            dateOfDeath: ctx.params.data.dateOfDeath,
                            graveyardName: ctx.params.data.graveyardName,
                            graveNumber: ctx.params.data.graveNumber,
                            QRCode: ctx.params.data.QRCode,
                            QRimage: ctx.params.data.QRimage,
                        })
                    }
                }
                return false
            }
        },


        getAll: {
            async handler(ctx) {
                return await Tumulos.find()
            }
        },

        getById: {
            async handler(ctx) {
                if (ctx.params.data && ctx.params.id) {
                    return await Tumulos.find({ _id: ctx.params.id })
                }
                return false
            }
        },

        update: {
            params: {
                dateOfDeath: "date",
                graveyardName: "string",
                graveNumber: "number",
                QRCode: "string",
            },
            async handler(ctx) {
                if (ctx.params.data && ctx.params.data.id) {
                    return await Tumulos.updateOne({ _id: ctx.params.id }, { $set: {
                        dateOfDeath: ctx.params.data.dateOfDeath,
                        graveyardName: ctx.params.data.graveyardName,
                        graveNumber: ctx.params.data.graveNumber,
                        QRCode: ctx.params.data.QRCode,
                        QRimage: ctx.params.data.QRimage,
                    } });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params.data && ctx.params.data.id) {
                    return await Tumulos.deleteOne({ _id: ctx.params.data.id })
                }
                return false
            }
        }
    }
}