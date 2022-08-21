const AnimalViolence = require("../model/AnimalViolence");
const mongoose = require("mongoose");

module.exports = {
	name: "animal-violence",
	version: 1,
	actions: {
		create: {
			async handler(ctx) {
				const _id = mongoose.Types.ObjectId();
				const timeElapsed = Date.now();
				const today = new Date(timeElapsed);
				if (ctx.params) {
					if (
						ctx.params.data.cityid &&
						ctx.params.data.street &&
						ctx.params.data.userid &&
						ctx.params.data.streetNumber &&
						ctx.params.data.referencePoint &&
						ctx.params.data.latitude &&
						ctx.params.data.longitude &&
						ctx.params.data.description &&
						ctx.params.data.images
					) {
						return AnimalViolence.create({
							_id,
							userid: ctx.params.data.userid,
							cityid: ctx.params.data.cityid,
							street: ctx.params.data.street,
							streetNumber: ctx.params.data.streetNumber,
							referencePoint: ctx.params.data.referencePoint,
							latitude: ctx.params.data.latitude,
							longitude: ctx.params.data.longitude,
							description: ctx.params.data.description,
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
				return await AnimalViolence.find();
			},
		},

		getById: {
			async handler(ctx) {
				if (ctx.params && ctx.params.id) {
					return await AnimalViolence.find({
						_id: ctx.params.id,
					});
				}
				return false;
			},
		},

		update: {
			async handler(ctx) {
				if (ctx.params && ctx.params.id) {
					return await AnimalViolence.updateOne(
						{ _id: ctx.params.id },
						{
							$set: {
								cityid: ctx.params.data.cityid,
								street: ctx.params.data.street,
								streetNumber: ctx.params.data.streetNumber,
								referencePoint: ctx.params.data.referencePoint,
								latitude: ctx.params.data.latitude,
								longitude: ctx.params.data.longitude,
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
					return await AnimalViolence.updateOne(
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
					return await AnimalViolence.deleteOne({
						_id: ctx.params.id,
					});
				}
				return false;
			},
		},
	},
};
