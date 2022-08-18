const mongoose = require('mongoose')

const schema = mongoose.Schema({
    idObj: mongoose.Schema.Types.ObjectId,
    imagesLink: [String],
})

module.exports = mongoose.model("Images", schema)