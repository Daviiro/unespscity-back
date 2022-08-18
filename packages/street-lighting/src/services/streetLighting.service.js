const StreetLighting = require("../model/StreetLighting")
const mongoose = require('mongoose');

module.exports = {
    name: "street-lighting-service",
    version: 1,
    actions: {
        create: {
            async handler(ctx) {
                const _id = mongoose.Types.ObjectId();
                const timeElapsed = Date.now();
	            const today = new Date(timeElapsed);
                //today.toLocaleDateString();
                if (ctx.params) {
                    if (ctx.params.street 
                        && ctx.params.streetNumber
                        && ctx.params.referencePoint
                        && ctx.params.latitude
                        && ctx.params.longitude
                        && ctx.params.description
                        && ctx.params.images
                        ) {
                        return StreetLighting.create({
                            _id,
                            userId: ctx.params.userId,
                            cityId: ctx.params.cityId, 
                            street: ctx.params.street,
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
                    return await StreetLighting.updateOne({ _id: ctx.params.id }, { $set: {
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