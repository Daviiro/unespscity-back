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
                    if (ctx.params.data.cityId && ctx.params.data.type && ctx.params.data.totalSolicitados && ctx.params.data.totalResolvidos) {
                        return GraficosServicos.create({
                            _id,
                            cityId: ctx.params.data.cityId,
                            type: ctx.params.data.type,
                            totalSolicitados: ctx.params.data.totalSolicitados,
                            totalResolvidos: ctx.params.data.totalResolvidos,
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
                if (ctx.params.data && ctx.params.id) {
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
                if (ctx.params.data && ctx.params.data.id) {
                    return await GraficosServicos.updateOne({ _id: ctx.params.id }, { $set: {
                        type: ctx.params.data.type,
                        totalSolicitados: ctx.params.data.totalSolicitados,
                        totalResolvidos: ctx.params.data.totalResolvidos,
                    } });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params.data && ctx.params.data.id) {
                    return await GraficosServicos.deleteOne({ _id: ctx.params.data.id })
                }
                return false
            }
        }
    }
}