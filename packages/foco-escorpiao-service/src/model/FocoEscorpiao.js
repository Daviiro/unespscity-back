const mongoose = require('mongoose')

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: Number,
    cityId: Number,
    street: String,
    number: Number,
    referencePoint: String,
    latitude: Number,
    longitude: Number,
    description: String,
    images: [String],
    date: Date,
    isResolved: Boolean
})

module.exports = mongoose.model("Foco_Escorpiao", schema)