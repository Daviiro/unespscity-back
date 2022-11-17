const Paviment = require("../model/Pavement")
const mongoose = require('mongoose');

module.exports = {
    name: "paviment-service",
    version: 1,
    actions: {
        create: {
            async handler(ctx) {
                const _id = mongoose.Types.ObjectId();
                const historicId = mongoose.Types.ObjectId();
                const timeElapsed = Date.now();
                const today = new Date(timeElapsed);
                if (ctx.params) {
                    if (ctx.params.street
                        && ctx.params.streetNumber
                        && ctx.params.referencePoint
                        && ctx.params.latitude
                        && ctx.params.longitude
                        && ctx.params.description
                    ) {
                        this.createHistoric({
                            id: historicId,
                            userId: ctx.params.userId,
                            serviceId: _id,
                            serviceName: "Problemas com Pavimentação",
                            description: ctx.params.description,
                            street: ctx.params.street,
                            streetNumber: ctx.params.streetNumber,
                            isResolved: 1,
                            date: today,
                        });
                        return Paviment.create({
                            _id,
                            street: ctx.params.street,
                            userId: ctx.params.userId,
                            cityId: ctx.params.cityId,
                            streetNumber: ctx.params.streetNumber,
                            referencePoint: ctx.params.referencePoint,
                            latitude: ctx.params.latitude,
                            longitude: ctx.params.longitude,
                            description: ctx.params.description,
                            images: ctx.params.images,
                            isResolved: false,
                            date: today
                        })
                    }
                }
                return false
            }
        },

        getAll: {
            async handler(ctx) {
                return await Paviment.find()
            }
        },

        getById: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Paviment.find({ _id: ctx.params.id })
                }
                return false
            }
        },

        update: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Paviment.updateOne({ _id: ctx.params.id }, {
                        $set: {
                            street: ctx.params.street,
                            streetNumber: ctx.params.streetNumber,
                            referencePoint: ctx.params.referencePoint,
                            latitude: ctx.params.latitude,
                            longitude: ctx.params.longitude,
                            description: ctx.params.description,
                            images: ctx.params.images,
                        }
                    });
                }
                return false
            }
        },

        updateResolved: {
            async handler(ctx) {
                let newDescription = ''; 
                if (ctx.params) {
                    if (ctx.params.isResolved === 2) {
                        newDescription = '\n\n Atualização: \n ' + ctx.params.description
                    }
                    if (ctx.params.isResolved === 3) {
                        newDescription = '\n\n Finalizado: \n ' + ctx.params.description
                    }
                    return await Paviment.updateOne({ _id: ctx.params.id }, { $set: { isResolved: ctx.params.isResolved,  description: $getField + newDescription} });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await Paviment.deleteOne({ _id: ctx.params.id })
                }
                return false
            }
        }
    },

    methods: {
        async createHistoric(params) {
            try {
                console.log(params)
                await this.broker.call("v1.historic.create", {
                    _id: params.id,
                    userId: params.userId,
                    serviceId: params.serviceId,
                    serviceName: params.serviceName,
                    description: params.description,
                    street: params.street,
                    streetNumber: params.streetNumber,
                    isResolved: params.isResolved,
                    date: params.date,
                });
                console.log('passou')
                return true;
            } catch (error) {
                if (error.name == "ServiceNotFoundError") {
                    this.logger.info(error);
                    return;
                } else
                    throw error;
            }
        }
    }

}