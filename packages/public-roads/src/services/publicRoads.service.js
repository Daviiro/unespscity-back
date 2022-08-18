const PublicRoads = require("../model/PublicRoads")

module.exports = {
    name: "public-roads-service",
    version: 1,
    actions: {
        create: {
            async handler(ctx) {
                const _id = mongoose.Types.ObjectId();
                const timeElapsed = Date.now();
	            const today = new Date(timeElapsed);
                if (ctx.params) {
                    if (ctx.params.street 
                        && ctx.params.streetNumber
                        && ctx.params.referencePoint
                        && ctx.params.latitude
                        && ctx.params.longitude
                        && ctx.params.description
                        && ctx.params.images
                        ) {
                        return PublicRoads.create({
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
                return await PublicRoads.find()
            }
        },

        getById: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await PublicRoads.find({ _id: ctx.params.id })
                }
                return false
            }
        },

        update: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await PublicRoads.updateOne({ _id: ctx.params.id }, { $set: {
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
                    return await PublicRoads.updateOne({ _id: ctx.params.id }, { $set: { isResolved: true } });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await PublicRoads.deleteOne({ _id: ctx.params.id })
                }
                return false
            }
        }
    }

}