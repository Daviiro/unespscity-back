const Fair = require("../model/Fair");
const mongoose = require("mongoose");

module.exports = {
	name: "fair",
	version: 1,
	actions: {
		create: {
			async handler(ctx) {
				console.log("data has been received: ", ctx.params.data.cityid);
				const _id = mongoose.Types.ObjectId();
				const timeElapsed = Date.now();
				const today = new Date(timeElapsed);
				if (ctx.params.data) {
					if (
						ctx.params.data.cityid &&
						ctx.params.data.name &&
						ctx.params.data.imgsrc &&
						ctx.params.data.operatingDays &&
						ctx.params.data.location &&
						ctx.params.data.openingHour &&
						ctx.params.data.closingHour
					) {
						return Fair.create({
							_id,
							cityid: ctx.params.data.cityid,
							name: ctx.params.data.name,
							imgsrc: ctx.params.data.imgsrc,
							operatingDays: ctx.params.data.operatingDays,
							location: ctx.params.data.location,
							openingHour: ctx.params.data.openingHour,
							closingHour: ctx.params.data.closingHour,
							date: today,
						});
					}
				}
				return false;
			},
		},

		getAll: {
			async handler(ctx) {
				return await Fair.find();
			},
		},

		getByCityId: {
			async handler(ctx) {
				if (ctx.params && ctx.params.cityid) {
					return await Fair.find({
						// Esse find é igual no JS. Ele vai achar uma feira com o cityId
						cityid: ctx.params.cityid, // Pelo que eu vi, o documento feira nao tem esse cityId como atributo
					});
				}
				return false;
			},
		},

		delete: {
			async handler(ctx) {
				if (ctx.params && ctx.params.id) {
					return await Fair.deleteOne({
						_id: ctx.params.id,
					});
				}
				return false;
			},
		},
	},
};
