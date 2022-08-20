const mongoose = require('mongoose')

const schema = mongoose.Schema({
    userId: Number,
    street: String,
    streetNumber: Number,
    referencePoint: String,
    cityId: Number,
    latitude: Number,
    longitude: Number,
    description: String,
    date: { type: Date, default: Date.now },
    images: [String],
    isResolved: Boolean
})

module.exports = mongoose.model("Parques", schema)