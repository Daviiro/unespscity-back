const mongoose = require("mongoose");

const operatingDaysSchema = mongoose.Schema({
	dom: Boolean,
	seg: Boolean,
	ter: Boolean,
	qua: Boolean,
	qui: Boolean,
	sex: Boolean,
	sab: Boolean,
});
const LocationSchema = mongoose.Schema({
	lat: Number,
	lng: Number,
});
const schema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	cityid: Number,
	name: String,
	imgsrc: String,
	operatingDays: operatingDaysSchema,
	location: LocationSchema,
	openingHour: Date,
	closingHour: Date,
	date: Date,
});

module.exports = mongoose.model("Fair", schema);
