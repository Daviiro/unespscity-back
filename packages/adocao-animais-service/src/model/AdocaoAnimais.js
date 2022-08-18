const mongoose = require('mongoose')

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: Number,
    cityId: Number,
    owner: String,
    description: String,
    images: [String],
    date: Date,
    isResolved: Boolean
})

module.exports = mongoose.model("Adocao_Animais", schema)