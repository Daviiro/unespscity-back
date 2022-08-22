const SolidaryDisposal = require("../model/SolidaryDisposal");
const mongoose = require("mongoose");

module.exports = {
	name: "solidary-disposal",
	version: 1,
	actions: {
		create: {
			async handler(ctx) {
				const _id = mongoose.Types.ObjectId();
				const timeElapsed = Date.now();
				const today = new Date(timeElapsed);
				console.log("Data received: " + ctx.params.data.userId);
				console.log("Data received: " + ctx.params.data.cityid);
				console.log("Data received: " + ctx.params.data.street);
				console.log("Data received: " + ctx.params.data.streetNumber);
				console.log("Data received: " + ctx.params.data.referencePoint);
				console.log("Data received: " + ctx.params.data.latitude);
				console.log("Data received: " + ctx.params.data.longitude);
				console.log("Data received: " + ctx.params.data.donationType);
				console.log("Data received: " + ctx.params.data.description);

				if (ctx.params.data) {
					if (
						ctx.params.data.userId &&
						ctx.params.data.cityid &&
						ctx.params.data.street &&
						ctx.params.data.streetNumber &&
						ctx.params.data.referencePoint &&
						ctx.params.data.latitude &&
						ctx.params.data.longitude &&
						ctx.params.data.donationType &&
						ctx.params.data.description
					) {
						return SolidaryDisposal.create({
							_id,
							userId: ctx.params.data.userId,
							cityid: ctx.params.data.cityid,
							street: ctx.params.data.street,
							streetNumber: ctx.params.data.streetNumber,
							referencePoint: ctx.params.data.referencePoint,
							latitude: ctx.params.data.latitude,
							longitude: ctx.params.data.longitude,
							donationType: ctx.params.data.donationType,
							description: ctx.params.data.description,
							images: ctx.params.data.images,
							isResolved: false,
							date: today,
						});
					}
				}
				return false;
			},
		},

		getAll: {
			async handler(ctx) {
				return await SolidaryDisposal.find();
			},
		},

		getById: {
			async handler(ctx) {
				if (ctx.params && ctx.params.id) {
					return await SolidaryDisposal.find({
						_id: ctx.params.id,
					});
				}
				return false;
			},
		},

		update: {
			async handler(ctx) {
				if (ctx.params.data && ctx.params.data.id) {
					return await SolidaryDisposal.updateOne(
						{ _id: ctx.params.id },
						{
							$set: {
								userId: ctx.params.userId,
								cityid: ctx.params.data.cityid,
								street: ctx.params.data.street,
								streetNumber: ctx.params.data.streetNumber,
								referencePoint: ctx.params.data.referencePoint,
								latitude: ctx.params.data.latitude,
								longitude: ctx.params.data.longitude,
								donationType: ctx.params.data.donationType,
								description: ctx.params.data.description,
								images: ctx.params.data.images,
							},
						}
					);
				}
				return false;
			},
		},

		updateResolved: {
			async handler(ctx) {
				if (ctx.params && ctx.params.id) {
					return await SolidaryDisposal.updateOne(
						{ _id: ctx.params.id },
						{ $set: { isResolved: true } }
					);
				}
				return false;
			},
		},

		delete: {
			async handler(ctx) {
				if (ctx.params && ctx.params.id) {
					return await SolidaryDisposal.deleteOne({
						_id: ctx.params.id,
					});
				}
				return false;
			},
		},
	},
};
