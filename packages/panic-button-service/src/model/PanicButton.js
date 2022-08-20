const mongoose = require('mongoose')

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: Number,
    street: String,
    streetNumber: Number,
    latitude: Number,
    longitude: Number, 
    panicButtonPhone: String,
    message: String,
    notifyPolice: Boolean, 
    notifyAmbulance: Boolean, 
})

module.exports = mongoose.model("BotaoPanico", schema);