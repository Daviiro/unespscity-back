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
				if (ctx.params) {
					if (
						ctx.params.cityid &&
						ctx.params.street &&
						ctx.params.streetNumber &&
						ctx.params.referencePoint &&
						ctx.params.latitude &&
						ctx.params.longitude &&
						ctx.params.donationType &&
						ctx.params.description &&
						ctx.params.images
					) {
						return SolidaryDisposal.create({
							_id,
							cityid: ctx.params.cityid,
							street: ctx.params.street,
							streetNumber: ctx.params.streetNumber,
							referencePoint: ctx.params.referencePoint,
							latitude: ctx.params.latitude,
							longitude: ctx.params.longitude,
							donationType: ctx.params.donationType,
							description: ctx.params.description,
							images: ctx.params.images,
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
				if (ctx.params && ctx.params.id) {
					return await SolidaryDisposal.updateOne(
						{ _id: ctx.params.id },
						{
							$set: {
								cityid: ctx.params.cityid,
								street: ctx.params.street,
								streetNumber: ctx.params.streetNumber,
								referencePoint: ctx.params.referencePoint,
								latitude: ctx.params.latitude,
								longitude: ctx.params.longitude,
								donationType: ctx.params.donationType,
								description: ctx.params.description,
								images: ctx.params.images,
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
