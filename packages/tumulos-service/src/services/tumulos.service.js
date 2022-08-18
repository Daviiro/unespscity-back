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
                    if (ctx.params.dateOfDeath && ctx.params.graveyardName && ctx.params.graveNumber && ctx.params.QRCode && ctx.params.QRimage) {
                        return Tumulos.create({
                            _id,
                            userId: ctx.params.userId,
                            cityId: ctx.params.cityId,
                            dateOfDeath: ctx.params.dateOfDeath,
                            graveyardName: ctx.params.graveyardName,
                            graveNumber: ctx.params.graveNumber,
                            QRCode: ctx.params.QRCode,
                            QRimage: ctx.params.QRimage,
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
                if (ctx.params && ctx.params.id) {
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
                if (ctx.params && ctx.params.id) {
                    return await Tumulos.updateOne({ _id: ctx.params.id }, { $set: {
                        dateOfDeath: ctx.params.dateOfDeath,
                        graveyardName: ctx.params.graveyardName,
                        graveNumber: ctx.params.graveNumber,
                        QRCode: ctx.params.QRCode,
                        QRimage: ctx.params.QRimage,
                    } });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Tumulos.deleteOne({ _id: ctx.params.id })
                }
                return false
            }
        }
    }
}