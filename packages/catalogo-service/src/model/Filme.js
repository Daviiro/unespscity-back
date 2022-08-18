const mongoose = require('mongoose')

const schema = mongoose.Schema({
    nome: String,
    sinopse: String
})

module.exports = mongoose.model("Filme", schema)