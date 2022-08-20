const mongoose = require('mongoose')

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    latitude: Number,
    longitude: Number,
    temperature: Number,
    humidity: Number,
    precipitation: Number,
    wind: Number,
    date: Date
})

module.exports = mongoose.model("SensoresTemperatura", schema);