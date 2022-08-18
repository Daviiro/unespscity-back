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
    broker.call("submenu-service.create", { name: "Iluminação pública", menuId: 1, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Pavimentação", menuId: 1, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Fiscalização de Instalações", menuId: 1, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Monumentos e Chafarizes", menuId: 1, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Vias Públicas", menuId: 1, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Pontes em Estradas Rurais", menuId: 2, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Parques", menuId: 2, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Praças", menuId: 2, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Resíduos Sólidos", menuId: 3, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Animais Mortos", menuId: 3, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Limpeza de Terreno", menuId: 4, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Limpeza de Piscina", menuId: 4, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Restaurantes e Ambientes", menuId: 4, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Radar da Dengue", menuId: 5, logo: '../../assets/Icones/home_controle_pragas.png', type: "RadarDengue" });
    broker.call("submenu-service.create", { name: "Foco de Escorpião", menuId: 5, logo: '../../assets/Icones/home_controle_pragas.png', type: "RadarEscorpiao" });
    broker.call("submenu-service.create", { name: "Leishmaniose", menuId: 5, logo: '../../assets/Icones/home_controle_pragas.png', type: "RadarLeishmaniose" });
    broker.call("submenu-service.create", { name: "Insetos, roedores, etc...", menuId: 5, logo: '../../assets/Icones/home_controle_pragas.png', type: "Dedetizacao" });
    broker.call("submenu-service.create", { name: "Animais abandonado", menuId: 6, logo: '../../assets/Icones/home_controle_pragas.png', type: "LostAnimals" });
    broker.call("submenu-service.create", { name: "Animais sinantrópicos", menuId: 6, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Captura de animais de grande porte", menuId: 6, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Animais Perdidos", menuId: 6, logo: '../../assets/Icones/home_controle_pragas.png', type: "LostAnimals" });
    broker.call("submenu-service.create", { name: "Adoção de animais", menuId: 6, logo: '../../assets/Icones/home_controle_pragas.png', type: "LostAnimals" });
    broker.call("submenu-service.create", { name: "Denúncia de maus tratos de animais", menuId: 6, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Adoção de Áreas públicas", menuId: 7, logo: '../../assets/Icones/home_controle_pragas.png', type: "PublicAreas" });
    broker.call("submenu-service.create", { name: "Indicadores de poluição", menuId: 7, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Coleta de Lixo / Coleta seletiva", menuId: 7, logo: '../../assets/Icones/home_controle_pragas.png', type: "MapColetaLixo" });
    broker.call("submenu-service.create", { name: "Animais Silvestres", menuId: 8, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Danos à Fauna", menuId: 8, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Cadastro de árvores", menuId: 8, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Locais úteis ao cidadão", menuId: 9, logo: '../../assets/Icones/home_controle_pragas.png', type: "PublicAreas" });
    broker.call("submenu-service.create", { name: "Telefones Úteis", menuId: 9, logo: '../../assets/Icones/home_controle_pragas.png', type: "PublicAreas" });
    broker.call("submenu-service.create", { name: "Programação Cultural", menuId: 9, logo: '../../assets/Icones/home_controle_pragas.png', type: "PublicAreas" });
    broker.call("submenu-service.create", { name: "Túmulos de falecidos", menuId: 9, logo: '../../assets/Icones/home_controle_pragas.png', type: "PublicAreas" });
    broker.call("submenu-service.create", { name: "Feiras Livres", menuId: 9, logo: '../../assets/Icones/home_controle_pragas.png', type: "PublicAreas" });
    broker.call("submenu-service.create", { name: "Cadastro de Diaristas", menuId: 9, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Moradores de Rua", menuId: 10, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Cadastro", menuId: 10, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Descarte Solidário", menuId: 10, logo: '../../assets/Icones/home_controle_pragas.png', type: "PublicAreas" });
    broker.call("submenu-service.create", { name: "Denúncia de violência doméstica", menuId: 11, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Ocorrência de Acidentes", menuId: 11, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Ocorrência de Furtos/Roubos", menuId: 11, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Mulheres", menuId: 12, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Idosos", menuId: 12, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Conheça os Gestores", menuId: 13, logo: '../../assets/Icones/home_controle_pragas.png', type: "PublicAreas" });
    broker.call("submenu-service.create", { name: "Consultar Propostas", menuId: 13, logo: '../../assets/Icones/home_controle_pragas.png', type: "PublicAreas" });
    broker.call("submenu-service.create", { name: "Central Anticorrupção", menuId: 13, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Notícias", menuId: 14, logo: '../../assets/Icones/home_controle_pragas.png', type: "PublicAreas" });
    broker.call("submenu-service.create", { name: "Sugestões", menuId: 14, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Rotas dos guardas", menuId: 15, logo: '../../assets/Icones/home_controle_pragas.png', type: "MapColetaLixo" });
    broker.call("submenu-service.create", { name: "Trânsito", menuId: 15, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Rota de Veículos", menuId: 15, logo: '../../assets/Icones/home_controle_pragas.png', type: "MapColetaLixo" });
    broker.call("submenu-service.create", { name: "Cartão fidelidade", menuId: 16, logo: '../../assets/Icones/home_controle_pragas.png', type: "Solicitacao" });
    broker.call("submenu-service.create", { name: "Ofertas Locais", menuId: 16, logo: '../../assets/Icones/home_controle_pragas.png', type: "PublicAreas" });

    broker.repl()
})

