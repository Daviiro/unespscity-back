const mongoose = require('mongoose')

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idCity: Number,
    name: String,
    phoneNumber: String, 
    description: String,
    images: [String],
})

module.exports = mongoose.model("TelefoneUtil", schema);