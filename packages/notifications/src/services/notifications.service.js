const Notifications = require("../model/Notifications");
const mongoose = require("mongoose");

module.exports = {
	name: "notifications",
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
						ctx.params.data.name &&
						ctx.params.data.description &&
						ctx.params.data.status
					) {
						return Notifications.create({
							_id,
							userId: ctx.params.data.userId,
							name: ctx.params.data.name,
							description: ctx.params.data.description,
							status: ctx.params.data.status,
							date: today,
						});
					}
				}
				return false;
			},
		},

		getUserNotifications: {
			async handler(ctx) {
				if (ctx.params.userId) {
					return await Notifications.find({
						userId: ctx.params.userId,
					});
				}
				return false;
			},
		},

		delete: {
			async handler(ctx) {
				if (ctx.params && ctx.params.id) {
					return await Notifications.deleteOne({
						_id: ctx.params.id,
					});
				}
				return false;
			},
		},
	},
};
