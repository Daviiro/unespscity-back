const FountainsMonuments = require("../model/FountainsMonuments");
const mongoose = require("mongoose");

module.exports = {
	name: "fountains-monuments-service",
	version: 1,
	actions: {
		create: {
			async handler(ctx) {
				const _id = mongoose.Types.ObjectId();
				const historicId = mongoose.Types.ObjectId();
				const timeElapsed = Date.now();
				const today = new Date(timeElapsed);
				if (ctx.params.data) {
					if (
						ctx.params.data.street &&
						ctx.params.data.streetNumber &&
						ctx.params.data.description
					) {
						this.createHistoric({
							id: historicId,
							userId: ctx.params.data.userId,
							serviceId: _id,
							serviceName: "Problemas com Monumentos",
							description: ctx.params.data.description,
							street: ctx.params.data.street,
							streetNumber: ctx.params.data.streetNumber,
							isResolved: 1,
							date: today,
						});
						return FountainsMonuments.create({
							_id,
							userId: ctx.params.data.userId,
							cityId: ctx.params.data.cityId,
							street: ctx.params.data.street,
							streetNumber: ctx.params.data.streetNumber,
							referencePoint: ctx.params.data.referencePoint,
							latitude: ctx.params.data.latitude,
							longitude: ctx.params.data.longitude,
							description: ctx.params.data.description,
							images: ctx.params.data.images,
							isResolved: false,
							date: today,
						});
					}
				}
				return false;
			},
		},

		getAll: {
			async handler(ctx) {
				return await FountainsMonuments.find();
			},
		},

		getById: {
			async handler(ctx) {
				if (ctx.params && ctx.params.id) {
					return await FountainsMonuments.find({
						_id: ctx.params.id,
					});
				}
				return false;
			},
		},

		update: {
			async handler(ctx) {
				if (ctx.params.data && ctx.params.data.id) {
					this.updateHistoric({
						serviceId: ctx.params.data.id,
						description: ctx.params.data.description,
						street: ctx.params.data.street,
						streetNumber: ctx.params.data.streetNumber,
					});
					return await FountainsMonuments.updateOne(
						{ _id: ctx.params.data.id },
						{
							$set: {
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
				const _id = mongoose.Types.ObjectId();
				const timeElapsed = Date.now();
				const today = new Date(timeElapsed);
				const problem = await FountainsMonuments.find({
					_id: ctx.params.data.id,
				});
				let newDescription = "";
				if (ctx.params.data) {
					if (ctx.params.data.serviceStatus === 2) {
						newDescription =
							problem[0].description +
							"\n\n Atualização: \n " +
							ctx.params.data.description;
					}
					if (ctx.params.data.serviceStatus === 3) {
						newDescription =
							problem[0].description +
							"\n\n Finalizado: \n " +
							ctx.params.data.description;
					}
					this.createNotification({
						_id,
						serviceId: ctx.params.data.id,
						userId: ctx.params.data.userId,
						serviceName: "Problemas com Monumentos",
						description: ctx.params.data.description,
						street: ctx.params.data.street,
						streetNumber: ctx.params.data.streetNumber,
						isRead: ctx.params.data.isRead,
						serviceStatus: ctx.params.data.serviceStatus,
						date: today,
					});
					return await FountainsMonuments.updateOne(
						{ _id: ctx.params.data.id },
						{
							$set: {
								serviceStatus: ctx.params.data.serviceStatus,
								description: newDescription,
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
					return await FountainsMonuments.deleteOne({
						_id: ctx.params.id,
					});
				}
				return false;
			},
		},
	},

	methods: {
		async createHistoric(params) {
			try {
				console.log(params);
				await this.broker.call("v1.historic.create", {
					_id: params.id,
					userId: params.userId,
					serviceId: params.serviceId,
					serviceName: params.serviceName,
					description: params.description,
					street: params.street,
					streetNumber: params.streetNumber,
					isResolved: params.isResolved,
					date: params.date,
				});
				console.log("passou");
				return true;
			} catch (error) {
				if (error.name == "ServiceNotFoundError") {
					this.logger.info(error);
					return;
				} else throw error;
			}
		},
		async updateHistoric(params) {
			try {
				await this.broker.call("v1.historic.update", {
					serviceId: params.serviceId,
					description: params.description,
					street: params.street,
					streetNumber: params.streetNumber,
					serviceStatus: params.serviceStatus,
				});
				return true;
			} catch (error) {
				if (error.name == "ServiceNotFoundError") {
					this.logger.info(error);
					return;
				} else throw error;
			}
		},
		async createNotification(params) {
			try {
				await this.broker.call("v1.notifications.create", {
					_id: params.id,
					serviceId: params.serviceId,
					userId: params.userId,
					serviceName: params.serviceName,
					description: params.description,
					street: params.street,
					streetNumber: params.streetNumber,
					isRead: params.isRead,
					serviceStatus: params.serviceStatus,
					date: params.date,
				});
				return true;
			} catch (error) {
				if (error.name == "ServiceNotFoundError") {
					this.logger.info(error);
					return;
				} else throw error;
			}
		},
	},
};
