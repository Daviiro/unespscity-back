const LocalTradeOffers = require("../model/LocalTradeOffer");
const mongoose = require("mongoose");

module.exports = {
	name: "local-trade-offers",
	version: 1,
	actions: {
		create: {
			async handler(ctx) {
				console.log("data has been received: ", ctx.params.data);
				const _id = mongoose.Types.ObjectId();
				const timeElapsed = Date.now();
				const today = new Date(timeElapsed);
				if (ctx.params.data) {
					if (
						ctx.params.data.cityid &&
						ctx.params.data.title &&
						ctx.params.data.price &&
						ctx.params.data.store &&
						ctx.params.data.street &&
						ctx.params.data.streetNumber &&
						ctx.params.data.latitude &&
						ctx.params.data.longitude &&
						ctx.params.data.description
					) {
						return LocalTradeOffers.create({
							_id,
							cityid: ctx.params.data.cityid,
							title: ctx.params.data.title,
							price: ctx.params.data.price,
							store: ctx.params.data.store,
							street: ctx.params.data.street,
							streetNumber: ctx.params.data.streetNumber,
							latitude: ctx.params.data.latitude,
							longitude: ctx.params.data.longitude,
							description: ctx.params.data.description,
							img: ctx.params.data.img,
							date: today,
						});
					}
				}
				return false;
			},
		},

		getAll: {
			async handler(ctx) {
				return await LocalTradeOffers.find();
			},
		},

		getByCityId: {
			async handler(ctx) {
				if (ctx.params && ctx.params.cityid) {
					return await LocalTradeOffers.find({
						// Esse find é igual no JS. Ele vai achar uma feira com o cityId
						cityid: ctx.params.cityid, // Pelo que eu vi, o documento feira nao tem esse cityId como atributo
					});
				}
				return false;
			},
		},

		update: {
			async handler(ctx) {
				if (ctx.params && ctx.params.id) {
					return await LocalTradeOffers.updateOne(
						{ _id: ctx.params.id },
						{
							$set: {
								cityid: ctx.params.data.cityid,
								title: ctx.params.data.title,
								price: ctx.params.data.price,
								store: ctx.params.data.store,
								street: ctx.params.data.street,
								streetNumber: ctx.params.data.streetNumber,
								latitude: ctx.params.data.latitude,
								longitude: ctx.params.data.longitude,
								description: ctx.params.data.description,
								img: ctx.params.data.img,
							},
						}
					);
				}
				return false;
			},
		},

		delete: {
			async handler(ctx) {
				if (ctx.params && ctx.params.id) {
					return await LocalTradeOffers.deleteOne({
						_id: ctx.params.id,
					});
				}
				return false;
			},
		},
	},
};
