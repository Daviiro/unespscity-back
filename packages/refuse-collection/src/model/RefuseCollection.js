// const mongoose = require("mongoose");

// const operatingDaysSchema = mongoose.Schema({
// 	dom: Boolean,
// 	seg: Boolean,
// 	ter: Boolean,
// 	qua: Boolean,
// 	qui: Boolean,
// 	sex: Boolean,
// 	sab: Boolean,
// });

// const schema = mongoose.Schema({
// 	_id: mongoose.Schema.Types.ObjectId,
// 	cityId: Number,
// 	route: [{ lat: Number, lng: Number }],
// 	polygon: [{ lat: Number, lng: Number }],
// 	operatingDays: operatingDaysSchema,
// 	typeOfRefuse: String,
// 	startTime: String,
// 	finishTime: String,
// });

// module.exports = mongoose.model("RefuseCollection", schema);

// create the same model, but with mysql

const Sequelize = require("sequelize");
const sequelize = new Sequelize({
	dialect: "mysql",
	host: "localhost",
	port: "3306", // Default for mysql => 3306
	database: "unespscity",
	username: "root",
	password: "",
});

const schema = {
	_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},

	cityId: Sequelize.INTEGER,

	route: Sequelize.JSON,
	polygon: Sequelize.JSON,
	
	operatingDays: Sequelize.JSON,
	typeOfRefuse: Sequelize.STRING,
	startTime: Sequelize.STRING,
	finishTime: Sequelize.STRING,
};

const RefuseCollection = sequelize.define("RefuseCollection", schema);
module.exports = RefuseCollection;