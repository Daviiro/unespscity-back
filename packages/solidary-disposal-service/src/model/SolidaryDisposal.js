const mongoose = require("mongoose");

const donationTypeSchema = mongoose.Schema({
	roupas: Boolean,
	eletro: Boolean,
	moveis: Boolean,
	outros: Boolean,
});

const schema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	cityid: Number,
	street: String,
	streetNumber: Number,
	referencePoint: String,
	latitude: Number,
	longitude: Number,
	donationType: donationTypeSchema,
	description: String,
	images: [String],
	isResolved: Boolean,
	date: Date,
});

module.exports = mongoose.model("SolidaryDisposal", schema);
