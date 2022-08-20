const TemperatureSensor = require("../model/TemperatureSensor")
const mongoose = require('mongoose');
import { CompressionTypes, Kafka, logLevel } from 'kafkajs';

let isActive = false;

const kafka = new Kafka({
    clientId: 'api',
    brokers: ['localhost:29092'],
    logLevel: logLevel.WARN,
    retry: {
      initialRetryTime: 300,
      retries: 15
    },
});
const producer = kafka.producer()

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

let atualTemperature = getRandomArbitrary(20,26);  
let atualUmidade = getRandomArbitrary(40, 45);
let chuva = getRandomArbitrary(0, 10);
let vento = getRandomArbitrary(3, 8);
let atualTemperature02 = getRandomArbitrary(20,26);  
let atualUmidade02 = getRandomArbitrary(atualUmidade - 2, atualUmidade + 2);
let chuva2 = getRandomArbitrary(0, 10);
let vento2 = getRandomArbitrary(3, 8);

let sensorData = {
    title: "Sensor localizado na Manoel Goulart - Frente ao Parque do Povo",
    latitude: -22.117968, 
    longitude: -51.404495,   
    temperature: 0, 
};

let sensorData02 = {
    title: "Sensor localizado no Catedral da Cidade",
    latitude: -22.122900, 
    longitude: -51.388858,   
    temperature: 0, 
};

async function generateData02() {
    sensorData02.temperature = getRandomArbitrary(atualTemperature02 - 0.5, atualTemperature02 + 0.5).toFixed(1);

    await producer.send({
        topic: 'iot_pollution',
        compression: CompressionTypes.GZIP,
        messages: [
          { value: JSON.stringify(sensorData02) }
        ],
    })
}

async function generateData() {
    sensorData.temperature = getRandomArbitrary(atualTemperature - 0.5, atualTemperature + 0.5).toFixed(1);
    
    await producer.send({
        topic: 'iot_pollution',
        compression: CompressionTypes.GZIP,
        messages: [
          { value: JSON.stringify(sensorData) }
        ],
    })

    if (isActive) [setTimeout(generateData02, 3000)]

    if (isActive) [setTimeout(generateData, 9000)]
}

module.exports = {
    name: "pollution-service",
    version: 1,
    actions: {
        start: {
            async handler(ctx) {
                await producer.connect();
                console.log('Starting...')
                isActive = true;
                generateData();
                return true;
            }
        },

        stop: {
            async handler(ctx) {
                console.log('Stop...')
                isActive = false;
                return true;
            }
        },

        getAll: {
            async handler(ctx) {
                return await TemperatureSensor.find();
            }
        },

        update: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await TemperatureSensor.updateOne({ _id: ctx.params.id }, { $set: {
                        street: ctx.params.street,
                        streetNumber: ctx.params.streetNumber,
                        referencePoint: ctx.params.referencePoint, 
                        latitude: ctx.params.latitude,
                        longitude: ctx.params.longitude, 
                        description: ctx.params.description,
                        images: ctx.params.images, 
                    } });
                }
                return false
            }
        },

        updateResolved: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await TemperatureSensor.updateOne({ _id: ctx.params.id }, { $set: { isResolved: true } });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await TemperatureSensor.deleteOne({ _id: ctx.params.id })
                }
                return false
            }
        }
    }

}