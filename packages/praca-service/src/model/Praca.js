const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: String,
    street: String,
    number: Number,
    cityId: Number,
    latitude: String,
    longitude: String,
    description: String,
    date: { type: Date, default: Date.now },
    images: [{ data: Buffer, contentType: String }],
    isResolved: Boolean
})

module.exports = mongoose.model("Praca", schema)