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
                    if (ctx.params.ontem && ctx.params.anteontem && ctx.params._threedays && ctx.params._fourdays && ctx.params._fivedays && ctx.params._sixdays && ctx.params._sevendays) {
                        return GraficosAcesso.create({
                            _id,
                            cityId: ctx.params.cityId,
                            ontem: ctx.params.ontem,
                            anteontem: ctx.params.anteontem,
                            _threedays: ctx.params._threedays,
                            _fourdays: ctx.params._fourdays,
                            _fivedays: ctx.params._fivedays,
                            _sixdays: ctx.params._sixdays,
                            _sevendays: ctx.params._sevendays,
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
                if (ctx.params && ctx.params.id) {
                    return await GraficosAcesso.updateOne({ _id: ctx.params.id }, { $set: {
                        ontem: ctx.params.ontem,
                        anteontem: ctx.params.anteontem,
                        _threedays: ctx.params._threedays,
                        _fourdays: ctx.params._fourdays,
                        _fivedays: ctx.params._fivedays,
                        _sixdays: ctx.params._sixdays,
                        _sevendays: ctx.params._sevendays,
                    } });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await GraficosAcesso.deleteOne({ _id: ctx.params.id })
                }
                return false
            }
        }
    }
}