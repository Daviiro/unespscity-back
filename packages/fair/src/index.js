const mongoose = require("mongoose");
//require("dotenv").config({ path: __dirname + "/../../../../.env" }); // Como vamos pegar localmente, usamos o arquivo config
const { SERVER } = require("../../../config");
const { ServiceBroker } = require("moleculer");

const inicial = async () => {
	//const mongoURI = process.env.MONGO_URI_SERVICOS_SOCIAIS;
	await mongoose.connect(SERVER);

	const db = mongoose.connection;
	db.on("error", (error) => console.error(error));
	db.once("open", () => console.log("Connected to MongoDB"));
	/*
	db.fairs.insert({
		_id: ObjectId("507f191e810c19729de860ea"),
		cityid: 222,
		name: "feira beira rio",
		imgsrc: "",
		operatingDays: {
			dom: true,
			seg: false,
			ter: false,
			qua: false,
			qui: false,
			sex: false,
			sab: true,
		},
		location: {
			lat: -22.2,
			lng: -51.40933,
		},
		openingHour: new Date(),
		closingHour: new Date(),
	});

	{
		"_id": "62f8208d77f6ac71a4e72f2a",
		"cityid": 222,
		"name": "feira",
		"imgsrc"  : "",
		"operatingDays": {
				  "dom": true,
				  "seg": false,
				  "ter": false,
				  "qua": false,
				  "qui": false,
				  "sex": false,
				  "sab": true
			  },
		"location": {
				  "lat": -22.2,
				  "lng": -51.40933
			  },
		"openingHour": "2020-05-18T14:10:30Z",
		"closingHour": "2020-05-18T14:10:30Z"
		
	  }

	const time = Date.now();
	var myobj = {
		_id: mongoose.isObjectIdOrHexString("62f8208d77f6ac71a4edd72f2a"),
		cityid: 777,
		name: "feira",
		imgsrc: "",
		operatingDays: {
			dom: true,
			seg: false,
			ter: false,
			qua: false,
			qui: false,
			sex: false,
			sab: true,
		},
		location: {
			lat: -22.2,
			lng: -51.40933,
		},
		openingHour: time,
		closingHour: time,
	};

	db.collection("fairs").insertOne(myobj, function (err, res) {
		if (err) throw err;
		console.log("1 document inserted");
		db.close();
	});*/

	const broker = new ServiceBroker({
		transporter: "TCP",
	});

	broker.loadServices("./src/services");

	broker.start().then(() => {
		broker.repl();
	});
};

inicial();
