const Favorites = require("../model/Favorites");
const mongoose = require("mongoose");

module.exports = {
	name: "favorites",
	version: 1,
	actions: {
		create: {
			async handler(ctx) {
				const _id = mongoose.Types.ObjectId();
				if (ctx.params.data) {
					if (
						ctx.params.data.userId &&
						ctx.params.data.id &&
						ctx.params.data.name &&
						ctx.params.data.img &&
						ctx.params.data.link
					) {
						return Favorites.create({
							_id,
							userId: ctx.params.data.userId,
							id: ctx.params.data.id,
							name: ctx.params.data.name,
							img: ctx.params.data.img,
							link: ctx.params.data.link,
						});
					}
				}
				return false;
			},
		},

		getUserFavorites: {
			async handler(ctx) {
				if (ctx.params.userId) {
					return await Favorites.find({
						userId: ctx.params.userId,
					});
				}
				return false;
			},
		},

		delete: {
			async handler(ctx) {
				if (ctx.params && ctx.params._id) {
					return await Favorites.deleteOne({
						_id: ctx.params._id,
					});
				}
				return false;
			},
		},
	},
};
