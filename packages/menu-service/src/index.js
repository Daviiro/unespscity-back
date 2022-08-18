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
    broker.call("menu-service.create", { name: "Conservação Urbana", logo: '../../assets/Icones/home_conservacao_urbana.png', subTitle: 'Itens' });
    broker.call("menu-service.create", { name: "Conservação Rural/Áreas Verdes", logo: '../../assets/Icones/home_conservacao_rural.png', subTitle: 'Itens' });
    broker.call("menu-service.create", { name: "Remoção de Detritos", logo: '../../assets/Icones/home_remocao_detritos.png', subTitle: 'Itens' });
    broker.call("menu-service.create", { name: "Vigilância Sanitária", logo: '../../assets/Icones/home_vigilancia_sanitaria.png', subTitle: 'Itens' });
    broker.call("menu-service.create", { name: "Controle de Pragas", logo: '../../assets/Icones/home_controle_pragas.png', subTitle: 'Itens' });
    broker.call("menu-service.create", { name: "Animais Dométicos", logo: '../../assets/Icones/home_animais_domesticos.png', subTitle: 'Itens' });
    broker.call("menu-service.create", { name: "Meio Ambiente", logo: '../../assets/Icones/home_meio_ambiente.png', subTitle: 'Itens' });
    broker.call("menu-service.create", { name: "Fauna e Flora", logo: '../../assets/Icones/home_fauna_flora.png', subTitle: 'Itens' });
    broker.call("menu-service.create", { name: "Assistência Social", logo: '../../assets/Icones/home_assistencia_social.png', subTitle: 'Itens' });
    broker.call("menu-service.create", { name: "Famílias Carentes", logo: '../../assets/Icones/home_familias_carentes.png', subTitle: 'Itens' });
    broker.call("menu-service.create", { name: "Segurança e Defesa Civil", logo: '../../assets/Icones/home_seguranca_defesa_civil.png', subTitle: 'Itens' });
    broker.call("menu-service.create", { name: "Botão de Pânico", logo: '../../assets/Icones/home_botao_panico.png', subTitle: 'Itens' });
    broker.call("menu-service.create", { name: "Administração Pública", logo: '../../assets/Icones/home_administracao_publica.png', subTitle: 'Itens' });
    broker.call("menu-service.create", { name: "Notificação e Comunicação", logo: '../../assets/Icones/home_notificacao_comunicacao.png', subTitle: 'Itens' });
    broker.call("menu-service.create", { name: "Sensoriamento Móvel Participativo", logo: '../../assets/Icones/home_sensoriamento_movel_participativo.png', subTitle: 'Itens' });
    broker.call("menu-service.create", { name: "Associação Comercial", logo: '../../assets/Icones/home_assossiacao_comercial.png', subTitle: 'Itens' });
    broker.repl();
})

