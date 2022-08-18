const mongoose = require('mongoose')

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idCity: Number,
    name: String, 
    street: String,
    streetNumber: Number,
    latitude: Number,
    longitude: Number,
    description: String,
    userId: Number, 
    images: [String], 
    isAdopted: Boolean,
    date: Date
})

module.exports = mongoose.model("AdocaoAreaPublica", schema);