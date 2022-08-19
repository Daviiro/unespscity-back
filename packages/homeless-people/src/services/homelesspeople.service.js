const HomelessPeople = require("../model/HomelessPeople");
const mongoose = require("mongoose");

module.exports = {
	name: "homeless-people",
	version: 1,
	actions: {
		create: {
			async handler(ctx) {
				const _id = mongoose.Types.ObjectId();
				const timeElapsed = Date.now();
				const today = new Date(timeElapsed);
				if (ctx.params.data) {
					if (
						ctx.params.data.userId &&
						ctx.params.data.cityId &&
						ctx.params.data.rg &&
						ctx.params.data.cpf &&
						ctx.params.data.birthday &&
						ctx.params.data.latitude &&
						ctx.params.data.longitude &&
						ctx.params.data.description &&
						ctx.params.data.images
					) {
						return HomelessPeople.create({
							_id,
							userId: ctx.params.data.userId,
							rg: ctx.params.data.rg,
							cityId: ctx.params.data.cityId,
							rg: ctx.params.data.rg,
							cpf: ctx.params.data.cpf,
							birthday: ctx.params.data.birthday,
							latitude: ctx.params.data.latitude,
							longitude: ctx.params.data.longitude,
							description: ctx.params.data.description,
							images: ctx.params.data.images,
							date: today,
						});
					}
				}
				return false;
			},
		},

		getAll: {
			async handler(ctx) {
				return await HomelessPeople.find();
			},
		},

		getById: {
			async handler(ctx) {
				if (ctx.params && ctx.params.id) {
					return await HomelessPeople.find({
						_id: ctx.params.id,
					});
				}
				return false;
			},
		},

		update: {
			async handler(ctx) {
				if (ctx.params && ctx.params.data.id) {
					return await HomelessPeople.updateOne(
						{ _id: ctx.params.data.id },
						{
							$set: {
								userId: ctx.params.data.userId,
								userId: ctx.params.data.cityId,
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
					return await HomelessPeople.updateOne(
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
					return await HomelessPeople.deleteOne({
						_id: ctx.params.id,
					});
				}
				return false;
			},
		},
	},
};
