const { where } = require("sequelize");
const RefuseCollection = require("../model/RefuseCollection");

module.exports = {
	name: "refuse",
	version: 1,
	actions: {
		create: {
			async handler(ctx) {
				console.log(ctx)
				if (ctx.params) {
					if (
						ctx.params.cityId &&
						ctx.params.route &&
						ctx.params.polygon &&
						ctx.params.operatingDays &&
						ctx.params.typeOfRefuse &&
						ctx.params.startTime &&
						ctx.params.finishTime
					) {
						return RefuseCollection.create({
							cityId: ctx.params.cityId,
							route: ctx.params.route,
							polygon: ctx.params.polygon,
							operatingDays: ctx.params.operatingDays,
							typeOfRefuse: ctx.params.typeOfRefuse,
							startTime: ctx.params.startTime,
							finishTime: ctx.params.finishTime,
						});
					}	
				}
				return false;
			},
		},

		getAll: {
			async handler(ctx) {
				return await RefuseCollection.findAll();
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

		deleteAll: {
			async handler(ctx) {
				return await RefuseCollection.destroy({ truncate: true, where: {} });
			},
		},

		update: {
			async handler(ctx) {
				if (ctx.params && ctx.params.id) {
					return await RefuseCollection.updateOne(
						{ _id: ctx.params.id },
						{
							$set: {
								cityId: ctx.params.cityId,
								route: ctx.params.route,
								polygon: ctx.params.polygon,
								operatingDays: ctx.params.operatingDays,
								typeOfRefuse: ctx.params.typeOfRefuse,
								startTime: ctx.params.startTime,
								finishTime: ctx.params.finishTime,
							},
						}
					);
				}
				return false;
			}
		}
	},
};