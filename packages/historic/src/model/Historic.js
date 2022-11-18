const mongoose = require("mongoose");

const schema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userId: String, 	
	serviceId: String, 
	serviceName: String,
	description: String,
	street: String,
	streetNumber: Number,
	serviceStatus: Number,
	date: Date,
});

module.exports = mongoose.model("Historic", schema);
