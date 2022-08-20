const { ServiceBroker } = require("moleculer")
const mongoose = require('mongoose')
const { SERVER } = require("../../../config")

const inicial = async () => {
    await mongoose.connect(SERVER)

    const broker = new ServiceBroker({
        transporter: "TCP"
    })

    broker.loadServices("./src/services");

    broker.start().then(() => {
        broker.repl()
    })
}

inicial()