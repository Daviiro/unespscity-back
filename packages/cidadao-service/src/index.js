"use strict";

const { ServiceBroker } = require("moleculer");
const DatabaseServices = require("./database/Database.ServiceTemplate.js");



const broker = new ServiceBroker({
    transporter: "TCP"
});



DatabaseServices.forEach((service) => {
    broker.createService(service);
});

broker.loadServices("./src/services");
broker.start().then(() => {
    broker.call("cidadao-service.create", { name: "José Silva", email: "jose@gmail.com", password: "senha123", mobilePhone: "18999999999", cityId: 1 })
        .then(res => console.log("Cadastrado!"))
        .catch(err => console.error("Error", err));
    broker.call("cidadao-service.create", { name: "Maria Silva", email: "maria@gmail.com", password: "senha123", mobilePhone: "18999998888", cityId: 2 })
        .then(res => console.log("Cadastrado!"))
        .catch(err => console.error("Error", err));
    broker.repl()
})

