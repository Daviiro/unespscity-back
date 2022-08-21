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

const schema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: String,
	cityId: Number,
	polygon: [{ lat: Number, lng: Number }],
	operatingDays: operatingDaysSchema,
	typeOfRefuse: String,
	startTime: Date,
	finishTime: Date,
});

module.exports = mongoose.model("RefuseCollection", schema);
