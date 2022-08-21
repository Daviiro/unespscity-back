const mongoose = require("mongoose");

const schema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	cityid: Number,
	title: String,
	price: Number,
	store: String,
	street: String,
	streetNumber: Number,
	latitude: Number,
	longitude: Number,
	description: String,
	img: String,
	date: Date,
});

module.exports = mongoose.model("LocalTradeOffers", schema);
