const mongoose = require("mongoose");
const GraficosServicos = require("../model/GraficosServicos");

module.exports = {
    name: "graficos-servicos-service",
    version: 1,
    actions: {
        create: {
            params: {
                cityId: "number",
                type: "string",
                totalSolicitados: "number",
                totalResolvidos: "number"
            },
            async handler(ctx) {
                const _id = mongoose.Types.ObjectId();
                if (ctx.params) {
                    if (ctx.params.type && ctx.params.totalSolicitados && ctx.params.totalResolvidos) {
                        return GraficosServicos.create({
                            _id,
                            cityId: ctx.params.cityId,
                            type: ctx.params.type,
                            totalSolicitados: ctx.params.totalSolicitados,
                            totalResolvidos: ctx.params.totalResolvidos,
                        })
                    }
                }
                return false
            }
        },


        getAll: {
            async handler(ctx) {
                return await GraficosServicos.find()
            }
        },

        getById: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await GraficosServicos.find({ _id: ctx.params.id })
                }
                return false
            }
        },

        update: {
            params: {
                type: "string",
                totalSolicitados: "number",
                totalResolvidos: "number",
            },
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await GraficosServicos.updateOne({ _id: ctx.params.id }, { $set: {
                        type: ctx.params.type,
                        totalSolicitados: ctx.params.totalSolicitados,
                        totalResolvidos: ctx.params.totalResolvidos,
                    } });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await GraficosServicos.deleteOne({ _id: ctx.params.id })
                }
                return false
            }
        }
    }
}