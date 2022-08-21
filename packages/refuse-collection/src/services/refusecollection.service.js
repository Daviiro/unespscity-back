const RefuseCollection = require("../model/RefuseCollection");
const mongoose = require("mongoose");

module.exports = {
	name: "refuse-collection",
	version: 1,
	actions: {
		create: {
			async handler(ctx) {
				const _id = mongoose.Types.ObjectId();
				if (ctx.params.data) {
					if (
						ctx.params.data.title &&
						ctx.params.data.cityId &&
						ctx.params.data.polygon &&
						ctx.params.data.operatingDays &&
						ctx.params.data.typeOfRefuse &&
						ctx.params.data.startTime &&
						ctx.params.data.finishTime
					) {
						return RefuseCollection.create({
							_id,
							title: ctx.params.data.title,
							cityId: ctx.params.data.cityId,
							polygon: ctx.params.data.polygon,
							operatingDays: ctx.params.data.operatingDays,
							typeOfRefuse: ctx.params.data.typeOfRefuse,
							startTime: ctx.params.data.startTime,
							finishTime: ctx.params.data.finishTime,
						});
					}
				}
				return false;
			},
		},

		getAll: {
			async handler(ctx) {
				return await RefuseCollection.find();
			},
		},

		getByCityId: {
			async handler(ctx) {
				if (ctx.params && ctx.params.cityid) {
					return await RefuseCollection.find({
						cityid: ctx.params.cityid,
					});
				}
				return false;
			},
		},

		delete: {
			async handler(ctx) {
				if (ctx.params && ctx.params.id) {
					return await RefuseCollection.deleteOne({
						_id: ctx.params.id,
					});
				}
				return false;
			},
		},
	},
};
