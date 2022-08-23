const WebSocket = require('ws');
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    brokers: ['localhost:29092'],
    clientId: 'certificate',
})

let firstTime = true;
let pause = false;
let totalTemperature = 0; 
let totalHumidity = 0;
let totalPrecipitation = 0;
let totalWind = 0;
let values = {}
let firstTemperature = true;
const topic = 'iot_temperature'
//const topic2 = 'iot_pollution'
//const topic2 = 'accident_records'
const topic3 = 'panic_button'
let consumer = kafka.consumer({ groupId: 'temperature-group' })
consumer.connect()                                                  // Metodo 02
consumer.subscribe({ topics: [topic, topic3] })             // Metodo 02


function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}

async function onMessage(ws, data, restart) {
    if (restart) {                       //UM JEITO DE FAZER - DEU MAIS CERTO    METODO 01 Se sair e entrar recebe os dados
        console.log("Iniciou")
        consumer = kafka.consumer({ groupId: 'temperature-group' })
        await consumer.connect()
        await consumer.subscribe({ topics: [topic, topic3] })
    }

    consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if(topic === "iot_temperature") {
                values = JSON.parse(message.value);
                totalTemperature = parseFloat(values.temperature) + totalTemperature;
                totalHumidity = parseFloat(values.humidity) + totalHumidity;
                totalPrecipitation = parseFloat(values.precipitation) + totalPrecipitation;
                totalWind = parseFloat(values.wind) + totalWind;
                if(!firstTemperature) {
                    totalTemperature = totalTemperature / 2;
                    totalHumidity = totalHumidity / 2;
                    totalPrecipitation = totalPrecipitation / 2;
                    totalWind = totalWind / 2;
                }
                firstTemperature = false; 
                ws.send(`${message.value}===${totalTemperature}===${totalHumidity}===${totalPrecipitation}===${totalWind}`)
            }
            if(topic === "panic_button") {
                ws.send(`${message.value}`);
            }
        },
    })


    /* if (data.toString() !== "Hello" || firstTime) {          // Metodo 02 - Se sair e tentar entrar de novo, nao recebe dados
        firstTime = false;
        console.log("Entrou")
        consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                if(topic === "iot_temperature") {
                    values = JSON.parse(message.value);
                    totalTemperature = parseFloat(values.temperature) + totalTemperature;
                    totalHumidity = parseFloat(values.humidity) + totalHumidity;
                    totalPrecipitation = parseFloat(values.precipitation) + totalPrecipitation;
                    totalWind = parseFloat(values.wind) + totalWind;
                    if(!firstTemperature) {
                        totalTemperature = totalTemperature / 2;
                        totalHumidity = totalHumidity / 2;
                        totalPrecipitation = totalPrecipitation / 2;
                        totalWind = totalWind / 2;
                    }
                    firstTemperature = false; 
                    ws.send(`${message.value}===${totalTemperature}===${totalHumidity}===${totalPrecipitation}===${totalWind}`)
                }
                if(topic === "panic_button") {
                    ws.send(`${message.value}`);
                }
            },
        })
    } */
    if (data.toString() === "Hello" && !firstTime) {
        ws.send("Reconectando")
    }
    console.log(`onMessage: ${data}`);
}
async function disc() {
    console.log("Executando")
    await consumer.disconnect();
    console.log("Finalizou")
}
async function onConnection(ws, req) {
    if (pause) {         //    METODO 01 
        consumer.disconnect();
    }

    ws.on('message', async data => {
        console.log("Entrou aqui")
        if (data.toString() === "Hello") {       //   METODO 01 
            await disc()
        }
        onMessage(ws, data, data.toString() === "Hello")            //  METODO 01 
        //onMessage(ws, data);                                            // Metodo 02
    });
    /* consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(topic);
            console.log(message.value)
            //console.log(`- ${message.value}`)
            //ws.send(`${message.value}`)

        },
    }) */
    ws.on('error', error => onError(ws, error));
    console.log(`onConnection`);
}

module.exports = (server) => {
    const wss = new WebSocket.Server({
        server
    });

    wss.on('connection', onConnection);

    console.log(`App Web Socket Server is running!`);
    return wss;
}









    /* if (data.toString() === "Hello" && !firstTime) {         // ESSE AQUI QUEBRA
        console.log("Entrou aqui")
        await consumer.disconnect();
        //await consumer.stop();

        await consumer.connect()
        await consumer.subscribe({ topics: [topic, topic3] })
    }
    firstTime = false;
    consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(topic);

            //console.log(`- ${message.value}`)
            ws.send(`${message.value}`)

        },
    }) */