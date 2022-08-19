const DiaristJanitor = require("../model/DiaristJanitor");
const mongoose = require("mongoose");

module.exports = {
	name: "diarist-janitor",
	version: 1,
	actions: {
		create: {
			async handler(ctx) {
				const _id = mongoose.Types.ObjectId();
				const timeElapsed = Date.now();
				const today = new Date(timeElapsed);
				if (ctx.params) {
					if (
						ctx.params.data.userId &&
						ctx.params.data.cityId &&
						ctx.params.data.street &&
						ctx.params.data.streetNumber &&
						ctx.params.data.referencePoint &&
						ctx.params.data.latitude &&
						ctx.params.data.longitude &&
						ctx.params.data.description &&
						ctx.params.data.images
					) {
						return DiaristJanitor.create({
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
							date: today,
						});
					}
				}
				return false;
			},
		},

		getAll: {
			async handler(ctx) {
				return await DiaristJanitor.find();
			},
		},

		getById: {
			async handler(ctx) {
				if (ctx.params && ctx.params.id) {
					return await DiaristJanitor.find({
						_id: ctx.params.id,
					});
				}
				return false;
			},
		},

		update: {
			async handler(ctx) {
				if (ctx.params && ctx.params.id) {
					return await DiaristJanitor.updateOne(
						{ _id: ctx.params.id },
						{
							$set: {
								cityId: ctx.params.cityId,
								street: ctx.params.street,
								streetNumber: ctx.params.streetNumber,
								referencePoint: ctx.params.referencePoint,
								latitude: ctx.params.latitude,
								longitude: ctx.params.longitude,
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
					return await DiaristJanitor.updateOne(
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
					return await DiaristJanitor.deleteOne({
						_id: ctx.params.id,
					});
				}
				return false;
			},
		},
	},
};
