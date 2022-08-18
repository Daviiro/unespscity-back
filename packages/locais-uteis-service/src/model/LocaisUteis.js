const mongoose = require('mongoose')

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cityId: Number,
    street: String,
    number: Number,
    referencePoint: String,
    latitude: Number,
    longitude: Number,
    description: String,
    images: [String],
})

module.exports = mongoose.model("Locais_Uteis", schema)