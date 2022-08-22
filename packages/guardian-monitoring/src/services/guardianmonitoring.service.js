const GuardianMonitorings = require("../model/GuardianMonitoring");
const mongoose = require("mongoose");

module.exports = {
	name: "guardian-monitoring",
	version: 1,
	actions: {
		create: {
			async handler(ctx) {
				console.log("data has been received: ", ctx.params.data);
				const _id = mongoose.Types.ObjectId();
				if (ctx.params.data) {
					if (
						ctx.params.data.cityid &&
						ctx.params.data.title &&
						ctx.params.data.origem &&
						ctx.params.data.destino &&
						ctx.params.data.distancia &&
						ctx.params.data.duracao
					) {
						return GuardianMonitorings.create({
							_id,
							cityid: ctx.params.data.cityid,
							title: ctx.params.data.title,
							origem: ctx.params.data.origem,
							destino: ctx.params.data.destino,
							waypoints: ctx.params.data.waypoints,
							distancia: ctx.params.data.distancia,
							duracao: ctx.params.data.duracao,
						});
					}
				}
				return false;
			},
		},

		getAll: {
			async handler(ctx) {
				return await GuardianMonitorings.find();
			},
		},

		getByCityId: {
			async handler(ctx) {
				if (ctx.params && ctx.params.cityid) {
					return await GuardianMonitorings.find({
						cityid: ctx.params.cityid,
					});
				}
				return false;
			},
		},

		delete: {
			async handler(ctx) {
				if (ctx.params && ctx.params.id) {
					return await GuardianMonitorings.deleteOne({
						_id: ctx.params.id,
					});
				}
				return false;
			},
		},
	},
};
