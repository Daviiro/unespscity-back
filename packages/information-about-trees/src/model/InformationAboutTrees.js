const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
	lat: Number,
	lng: Number,
});
const schema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	cityid: Number,
	userid: Number,
	name: String,
	imgsrc: String,
	specie: String,
	age: Number,
	location: LocationSchema,
	date: Date,
});

module.exports = mongoose.model("InformationAboutTrees", schema);
