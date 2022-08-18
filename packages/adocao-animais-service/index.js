const { ServiceBroker } = require("moleculer")
const connectToMongoDB = require('./src/database');


const inicial = async () => {
    connectToMongoDB();

    const broker = new ServiceBroker({
        transporter: "TCP"
    })

    broker.loadServices("./src/services");

    broker.start().then(() => {
        broker.repl()
    })
}

inicial()
