const mongoose = require("mongoose");
const Historic = require("../model/Historic");

module.exports = {
	name: "historic",
	version: 1,
	actions: {
		create: {
			async handler(ctx) {
				const _id = mongoose.Types.ObjectId();
				const timeElapsed = Date.now();
				const today = new Date(timeElapsed);
				if (ctx.params) {
					if (
						ctx.params.userId
					) {
						return Historic.create({
							_id,
							userId: ctx.params.userId,
							serviceId: ctx.params.serviceId,
							serviceName: ctx.params.serviceName,
							description: ctx.params.description,
							street: ctx.params.street,
							streetNumber: ctx.params.streetNumber,
							isResolved: ctx.params.isResolved,
							date: today,
						});
					}
				}
				return false;
			},
		},

		getById: {
			async handler(ctx) {
				if (ctx.params && ctx.params.userId) {
					return await Historic.find({
						userId: ctx.params.userId,
					});
				}
				return [];
			},
		},

		update: {
			async handler(ctx) {
				if (ctx.params && ctx.params.data.serviceId) {
					return await Historic.updateOne(
						{ serviceId: ctx.params.data.serviceId },
						{
							$set: {
								serviceName: ctx.params.data.serviceName,
								description: ctx.params.data.description,
								street: ctx.params.data.street,
								streetNumber: ctx.params.data.streetNumber,
								isResolved: ctx.params.data.isResolved,
								date: today,
							},
						}
					);
				}
				return false;
			},
		},
	},
};
