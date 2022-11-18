const mongoose = require("mongoose");

const schema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	serviceId: mongoose.Schema.Types.ObjectId,
	userId: Number,
	serviceName: String,
	description: String,
	street: String,
	streetNumber: Number,
	serviceStatus: Number,
	isRead: Number,
	date: Date,
});

module.exports = mongoose.model("Notifications", schema);
