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
    broker.call("menucidade-service.create", { cityId: 1, menuId: 1 });
    broker.call("menucidade-service.create", { cityId: 1, menuId: 2 });
    broker.call("menucidade-service.create", { cityId: 1, menuId: 3 });
    broker.call("menucidade-service.create", { cityId: 1, menuId: 4 });
    broker.call("menucidade-service.create", { cityId: 1, menuId: 5 });
    broker.call("menucidade-service.create", { cityId: 1, menuId: 6 });
    broker.call("menucidade-service.create", { cityId: 1, menuId: 7 });
    broker.call("menucidade-service.create", { cityId: 1, menuId: 8 });
    broker.call("menucidade-service.create", { cityId: 2, menuId: 9 });
    broker.call("menucidade-service.create", { cityId: 2, menuId: 10 });
    broker.call("menucidade-service.create", { cityId: 2, menuId: 11 });
    broker.call("menucidade-service.create", { cityId: 2, menuId: 12 });
    broker.call("menucidade-service.create", { cityId: 2, menuId: 13 });
    broker.call("menucidade-service.create", { cityId: 2, menuId: 14 });
    broker.call("menucidade-service.create", { cityId: 2, menuId: 15 });
    broker.call("menucidade-service.create", { cityId: 2, menuId: 16 });

    broker.repl()
}).catch((err) => {
    console.log("erro", err);
})

