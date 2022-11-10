const StreetLighting = require("../model/StreetLighting")
const mongoose = require('mongoose');
const notificationsService = require("../../../notifications/src/services/notifications.service");

module.exports = {
    name: "street-lighting-service",
    version: 1,
    actions: {
        create: {
            async handler(ctx) {
                const _id = mongoose.Types.ObjectId();
                const timeElapsed = Date.now();
                const today = new Date(timeElapsed);
                if (ctx.params) {
                    if (ctx.params.data.street
                        && ctx.params.data.streetNumber
                        && ctx.params.data.latitude
                        && ctx.params.data.longitude
                        && ctx.params.data.description
                    ) {
                        return StreetLighting.create({
                            _id,
                            userId: ctx.params.data.userId,
                            cityId: ctx.params.data.cityId,
                            street: ctx.params.data.street,
                            streetNumber: ctx.params.data.streetNumber,
                            referencePoint: ctx.params.data.referencePoint,
                            latitude: ctx.params.data.latitude,
                            longitude: ctx.params.data.longitude,
                            description: ctx.params.data.description,
                            images: ctx.params.data.images,
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
                return await StreetLighting.find()
            }
        },

        getById: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await StreetLighting.find({ _id: ctx.params.id })
                }
                return false
            }
        },

        update: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    const _id = mongoose.Types.ObjectId();
                    const timeElapsed = Date.now();
                    const today = new Date(timeElapsed);
                    notificationsService.actions.create({
                        _id,
                        userId: ctx.params.userId,
                        name: 'Serviço de Reparos de Postes de Luz',
                        description: ctx.params.description,
                        status: 1,
                        date: today,
                    })
                    return await StreetLighting.updateOne({ _id: ctx.params.id }, {
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
                if (ctx.params && ctx.params.id) {
                    return await StreetLighting.updateOne({ _id: ctx.params.id }, { $set: { isResolved: true } });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await StreetLighting.deleteOne({ _id: ctx.params.id })
                }
                return false
            }
        }
    }

}