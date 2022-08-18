const { ServiceBroker } = require("moleculer")

const inicial = async () => {

    const broker = new ServiceBroker({
        transporter: "TCP"
    })

    broker.loadServices("./src/services");

    broker.start().then(() => {
        broker.repl()
    })
}

inicial()