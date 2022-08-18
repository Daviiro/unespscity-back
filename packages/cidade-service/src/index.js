"use strict";

const { ServiceBroker } = require("moleculer");
const DatabaseServices = require("./database/Database.ServiceTemplate.js");

const broker = new ServiceBroker({
    transporter: "TCP"
})


DatabaseServices.forEach((service) => {
    broker.createService(service);
});

broker.loadServices("./src/services");

broker.start().then(() => {
    broker.call("cidade-service.create", { name: "Presidente Prudente" });
    broker.call("cidade-service.create", { name: "Álvarez Machado" });
    broker.repl()
})

