const PanicButton = require("../model/PanicButton")
import { CompressionTypes, Kafka, logLevel } from 'kafkajs';

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

module.exports = {
    name: "panic-button-service",
    version: 1,
    actions: {
        create: {
            async handler(ctx) {
                if (ctx.params) {
                    return PanicButton.create({
                        userId: ctx.params.data.userId,
                        panicButtonPhone: ctx.params.data.panicButtonPhone,
                        message: ctx.params.data.message,
                        notifyPolice: ctx.params.data.notifyPolice,
                        notifyAmbulance: ctx.params.data.notifyAmbulance,
                    })
                }
                return false
            }
        },

        callPanicButton: {
            async handler(ctx) {
                await producer.connect();
                console.log("Testando")
                await producer.send({
                    topic: 'panic_button',
                    compression: CompressionTypes.GZIP,
                    messages: [
                        { value: JSON.stringify(ctx.params.message) }
                    ],
                })
                console.log("deu certo aqui")
            }
        },

        getAll: {
            async handler(ctx) {
                if (ctx) {
                    return await PanicButton.find();
                }
                return false
            }
        },

        getById: {
            async handler(ctx) {
                if (ctx.params && ctx.params.userId) {
                    console.log(ctx.params.userId)
                    return await PanicButton.find({ userId: parseInt(ctx.params.userId, 10) });
                }
                return false
            }
        },

        update: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await PanicButton.updateOne({ _id: ctx.params.id }, {
                        $set: {
                            street: ctx.params.street,
                            streetNumber: ctx.params.streetNumber,
                            latitude: ctx.params.latitude,
                            longitude: ctx.params.longitude,
                            userId: ctx.params.userId,
                            message: ctx.params.message,
                            notifyPolice: ctx.params.notifyPolice,
                            notifyAmbulance: ctx.params.notifyAmbulance,
                        }
                    });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params && ctx.params.userId) {
                    return await PanicButton.deleteOne({ userId: ctx.params.userId })
                }
                return false
            }
        }
    }

}