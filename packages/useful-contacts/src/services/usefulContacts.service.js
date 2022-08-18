const UsefulContacts = require("../model/UsefulContacts")

module.exports = {
    name: "useful-contacts-service",
    version: 1,
    actions: {
        create: {
            async handler(ctx) {
                const _id = mongoose.Types.ObjectId();
                if (ctx.params) {
                    if (ctx.params.name
                        && ctx.params.phoneNumber
                        && ctx.params.description
                        && ctx.params.images
                        ) {
                        return UsefulContacts.create({
                            _id,
                            idCity: ctx.params.idCity,
                            name: ctx.params.name, 
                            phoneNumber: ctx.params.phoneNumber,
                            description: ctx.params.description,
                            images: ctx.params.images, 
                        })
                    }
                }
                return false
            }
        },

        getByCity: {
            async handler(ctx) {
                return await UsefulContacts.find()
            }
        },

        update: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await UsefulContacts.updateOne({ _id: ctx.params.id }, { $set: {
                        name: ctx.params.name, 
                        phoneNumber: ctx.params.phoneNumber,
                        description: ctx.params.description,
                        images: ctx.params.images, 
                    } });
                }
                return false
            }
        },

        delete: {
            async handler(ctx) {
                if (ctx.params && ctx.params.id) {
                    return await UsefulContacts.deleteOne({ _id: ctx.params.id })
                }
                return false
            }
        }
    }

}