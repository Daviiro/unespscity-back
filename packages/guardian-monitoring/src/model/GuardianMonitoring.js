const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
	lat: Number,
	lng: Number,
});

const waypointsSchema = mongoose.Schema({
	location: LocationSchema,
	stopover: Boolean,
});

const schema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	cityid: Number,
	title: String,
	origem: String,
	destino: String,
	waypoints: [waypointsSchema],
	distancia: String,
	duracao: String,
});

module.exports = mongoose.model("GuardianMonitoring", schema);
