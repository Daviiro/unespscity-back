const mongoose = require('mongoose')

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cityId: Number,
    type: String,
    totalSolicitados: Number,
    totalResolvidos: Number
})

module.exports = mongoose.model("GraficosServico", schema)