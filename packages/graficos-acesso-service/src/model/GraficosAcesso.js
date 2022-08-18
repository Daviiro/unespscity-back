const mongoose = require('mongoose')

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cityId: Number,
    ontem: Number,
    anteontem: Number,
    _threedays: Number,
    _fourdays: Number,
    _fivedays: Number,
    _sixdays: Number,
    _sevendays: Number
})

module.exports = mongoose.model("GraficosAcesso", schema)