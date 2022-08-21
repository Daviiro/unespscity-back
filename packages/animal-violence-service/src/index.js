const mongoose = require("mongoose");
const { SERVER } = require("../../../config");
const { ServiceBroker } = require("moleculer");

const inicial = async () => {
	await mongoose.connect(SERVER);

	const db = mongoose.connection;
	db.on("error", (error) => console.error(error));
	db.once("open", () => console.log("Connected to MongoDB"));

	const broker = new ServiceBroker({
		transporter: "TCP",
	});

	broker.loadServices("./src/services");

	broker.start().then(() => {
		broker.repl();
	});
};

inicial();
