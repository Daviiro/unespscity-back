const mongoose = require('mongoose')

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: Number,
    cityId: Number,
    dateOfDeath: Date,
    graveyardName: String,
    graveNumber: Number,
    QRCode: String,
    QRimage: [String]
})

module.exports = mongoose.model("Tumulos", schema)