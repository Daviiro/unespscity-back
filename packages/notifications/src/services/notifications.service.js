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
				if (ctx.params) {
					return Notifications.create({
						_id,
						serviceId: ctx.params.serviceId,
						userId: ctx.params.userId,
						serviceName: ctx.params.serviceName,
						description: ctx.params.description,
						street: ctx.params.street,
						streetNumber: ctx.params.streetNumber,
						serviceStatus: ctx.params.serviceStatus,
						isRead: ctx.params.isRead,
						date: today,
					});

				}
				return false;
			},
		},


		getUserNotifications: {
			async handler(ctx) {
				if (ctx.params.userId) {
					return await Notifications.find({
						userId: ctx.params.userId,
					}).sort({ date: -1 });
				}
				return false;
			},
		},

		updateAllNotifications: {
			async handler(ctx) {
				if (ctx.params && ctx.params.userId) {
					return await Notifications.updateMany({ userId: ctx.params.userId }, { $set: { isRead: 2 } });
				}
				return false;
			},
		},
	},
};
