const mongoose = require("mongoose");
const GraficosAcesso = require("../model/GraficosAcesso");

module.exports = {
    name: "graficos-acesso-service",
    version: 1,
    actions: {
        create: {
            params: {
                cityId: "number",
                ontem: "number",
                anteontem: "number",
                _threedays: "number",
                _fourdays: "number",
                _fivedays: "number",
                _sixdays: "number",
                _sevendays: "number"
            },
            async handler(ctx) {
                const _id = mongoose.Types.ObjectId();
                if (ctx.params) {
                    if (ctx.params.data.cityId && ctx.params.data.ontem && ctx.params.data.anteontem && ctx.params.data._threedays && ctx.params.data._fourdays && ctx.params.data._fivedays && ctx.params.data._sixdays && ctx.params.data._sevendays) {
                        return GraficosAcesso.create({
                            _id,
                            cityId: ctx.params.data.cityId,
                            ontem: ctx.params.data.ontem,
                            anteontem: ctx.params.data.anteontem,
                            _threedays: ctx.params.data._threedays,
                            _fourdays: ctx.params.data._fourdays,
                            _fivedays: ctx.params.data._fivedays,
                            _sixdays: ctx.params.data._sixdays,
                            _sevendays: ctx.params.data._sevendays,
                        })
                    }
                }
                return false
            }
        },


        getAll: {
            async handler(ctx) {
                return await GraficosAcesso.find()
            }
        },

        update: {
            params: {
                ontem: "number",
                anteontem: "number",
                _threedays: "number",
                _fourdays: "number",
                _fivedays: "number",
                _sixdays: "number",
                _sevendays: "number",
            },
            async handler(ctx) {
                if (ctx.params.data && ctx.params.data.id) {
                    return await GraficosAcesso.updateOne({ _id: ctx.params.id }, { $set: {
                        ontem: ctx.params.data.ontem,
                        anteontem: ctx.params.data.anteontem,
                        _threedays: ctx.params.data._threedays,
                        _fourdays: ctx.params.data._fourdays,
                        _fivedays: ctx.params.data._fivedays,
                        _sixdays: ctx.params.data._sixdays,
                        _sevendays: ctx.params.data._sevendays,
                    } });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params.data && ctx.params.data.id) {
                    return await GraficosAcesso.deleteOne({ _id: ctx.params.data.id })
                }
                return false
            }
        }
    }
}