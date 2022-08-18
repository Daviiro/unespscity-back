const mongoose = require("mongoose");

const imgSchema = mongoose.Schema({
	name: String,
	desc: String,
	img: {
		data: Buffer,
		contentType: String,
	},
});

const schema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	cityid: Number,
	street: String,
	streetNumber: Number,
	referencePoint: String,
	latitude: Number,
	longitude: Number,
	description: String,
	images: imgSchema,
	isResolved: Boolean,
	date: Date,
});

module.exports = mongoose.model("AccidentRecords", schema);
