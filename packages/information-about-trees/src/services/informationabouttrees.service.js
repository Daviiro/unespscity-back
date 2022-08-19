const InformationAboutTrees = require("../model/InformationAboutTrees");
const mongoose = require("mongoose");

module.exports = {
	name: "information-about-trees",
	version: 1,
	actions: {
		create: {
			async handler(ctx) {
				const _id = mongoose.Types.ObjectId();
				const timeElapsed = Date.now();
				const today = new Date(timeElapsed);
				console.log("ARVORE PRA ADICIONAR");
				console.log(ctx.params.data);
				if (ctx.params) {
					if (
						ctx.params.data.cityid &&
						ctx.params.data.userid &&
						ctx.params.data.name &&
						ctx.params.data.imgsrc &&
						ctx.params.data.specie &&
						ctx.params.data.age &&
						ctx.params.data.location
					) {
						return InformationAboutTrees.create({
							_id,
							cityid: ctx.params.data.cityid,
							userid: ctx.params.data.userid,
							name: ctx.params.data.name,
							imgsrc: ctx.params.data.imgsrc,
							specie: ctx.params.data.specie,
							age: ctx.params.data.age,
							location: ctx.params.data.location,
							date: today,
						});
					}
				}
				return false;
			},
		},

		getAll: {
			async handler(ctx) {
				return await InformationAboutTrees.find();
			},
		},

		getByCityId: {
			async handler(ctx) {
				if (ctx.params && ctx.params.cityid) {
					return await InformationAboutTrees.find({
						cityid: ctx.params.cityid,
					});
				}
				return false;
			},
		},

		delete: {
			async handler(ctx) {
				if (ctx.params && ctx.params.id) {
					return await InformationAboutTrees.deleteOne({
						_id: ctx.params.id,
					});
				}
				return false;
			},
		},
	},
};
