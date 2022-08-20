const mongoose = require("mongoose");

const schema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userId: Number,
	title: String,
	description: String,
	status: Number,
	date: Date,
});

module.exports = mongoose.model("Notifications", schema);
