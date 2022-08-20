const mongoose = require("mongoose");

const schema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userId: Number,
	id: Number, //este id eh relativo ao microsservico, soh pode ter um favorito com tal id para cada usuario
	name: String,
	img: String,
	link: String,
});

module.exports = mongoose.model("Favorites", schema);
