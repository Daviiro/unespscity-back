const AccidentRecords = require("../model/AccidentRecords");
const mongoose = require("mongoose");

module.exports = {
	name: "accident-records",
	version: 1,
	actions: {
		create: {
			async handler(ctx) {
				const _id = mongoose.Types.ObjectId();
				const timeElapsed = Date.now();
				const today = new Date(timeElapsed);
				if (ctx.params) {
					if (
						ctx.params.data.cityId &&
						ctx.params.data.street &&
						ctx.params.data.userId &&
						ctx.params.data.streetNumber &&
						ctx.params.data.referencePoint &&
						ctx.params.data.latitude &&
						ctx.params.data.longitude &&
						ctx.params.data.description &&
						ctx.params.data.images
					) {
						return AccidentRecords.create({
							_id,
							userId: ctx.params.data.userId,
							cityId: ctx.params.data.cityId,
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
				return await AccidentRecords.find();
			},
		},

		getById: {
			async handler(ctx) {
				if (ctx.params.data && ctx.params.id) {
					return await AccidentRecords.find({
						_id: ctx.params.id,
					});
				}
				return false;
			},
		},

		update: {
			async handler(ctx) {
				if (ctx.params.data && ctx.params.data.id) {
					return await AccidentRecords.updateOne(
						{ _id: ctx.params.data.id },
						{
							$set: {
								userId: ctx.params.data.userId,
								cityId: ctx.params.data.cityId,
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
					return await AccidentRecords.updateOne(
						{ _id: ctx.params.id },
						{ $set: { isResolved: true } }
					);
				}
				return false;
			},
		},

		delete: {
			async handler(ctx) {
				if (ctx.params.data && ctx.params.data.id) {
					return await AccidentRecords.deleteOne({
						_id: ctx.params.data.id,
					});
				}
				return false;
			},
		},
	},

	created() {
		console.log("Assets service instance created");
	},
};
