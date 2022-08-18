const AccidentRecords = require("../model/AccidentRecords");
const mongoose = require("mongoose");
const path = require("path");
const { createWriteStream } = require("fs");
const formidable = require("formidable");
const fs = require("fs");

/*
const singleUpload = async (_, { file }) => {
	const { createReadStream, filename, mimetype, encoding } = await file;

	await new Promise((res) =>
		createReadStream()
			.pipe(
				createWriteStream(path.join(__dirname, "../uploads", filename))
			)
			.on("close", res)
	);

	return true;
};


async function base64_encode(file) {
	// read binary data
	var bitmap = fs.readFileSync(file);
	// convert binary data to base64 encoded string
	return new Buffer(bitmap).toString("base64");
}
*/
function return_encode_64_image(stream) {
	const chunks = [];
	return new Promise((resolve) => {
		stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
		stream.on("end", () =>
			resolve(Buffer.concat(chunks).toString("base64"))
		);
	});
}

module.exports = {
	name: "accident-records",
	version: 1,
	actions: {
		create: {
			async handler(ctx) {
				console.log("params-> ", ctx.params);
				//console.log("params ", ctx.params.$multipart);
				console.log("##############");
				//console.log("ctx.meta.$multipart: ", ctx.meta.$multipart);
				if (
					ctx.params //.fileName == "no data"
				) {
					//ctx.params is the Readable stream (IMAGEM) containing the file passed to the endpoint
					if (ctx.meta.$multipart) {
						//ctx.meta.$multipart contains the additional text form-data fields must be sent before other files fields.
						if (ctx.meta.$multipart.fileName != "no data") {
							console.log(
								"foi recebido imagem E dados de texto do formulário"
							);
							const _id = mongoose.Types.ObjectId();
							const timeElapsed = Date.now();
							const today = new Date(timeElapsed);
							//const tst = singleUpload(ctx.params);
							//console.log("createReadStream ", //createReadStream);
							//console.log("mimetype ", //mimetype);
							//console.log("encoding", //encoding);

							/*
							let bitmap;
							ctx.params.on("data", function (chunk) {
								bitmap = chunk;
								console.log("CHUNK: ", chunk);
								
							});

							console.log("BITMAP: ", bitmap);*/

							const img_data = await ctx.params.on(
								"data",
								function (data) {
									const chunks = [];

									return new Promise((resolve, reject) => {
										ctx.params.on("data", (chunk) =>
											chunks.push(Buffer.from(chunk))
										);
										ctx.params.on("error", (err) =>
											reject(err)
										);
										ctx.params.on("end", () =>
											resolve(
												Buffer.concat(chunks).toString(
													"base64"
												)
											)
										);
									});
								}
							);

							//console.log(return_encode_64_image(ctx.param));
							const auxImg = {
								name: ctx.meta.$multipart.fileName,
								desc: "none",
								img: {
									data: img_data,
									contentType: "base64",
								},
							};

							if (
								ctx.meta.$multipart.cityid &&
								ctx.meta.$multipart.street &&
								ctx.meta.$multipart.streetNumber &&
								ctx.meta.$multipart.referencePoint &&
								ctx.meta.$multipart.latitude &&
								ctx.meta.$multipart.longitude &&
								ctx.meta.$multipart.description
							) {
								return AccidentRecords.create({
									_id,
									cityid: ctx.meta.$multipart.cityid,
									street: ctx.meta.$multipart.street,
									streetNumber:
										ctx.meta.$multipart.streetNumber,
									referencePoint:
										ctx.meta.$multipart.referencePoint,
									latitude: ctx.meta.$multipart.latitude,
									longitude: ctx.meta.$multipart.longitude,
									description:
										ctx.meta.$multipart.description,
									images: auxImg,
									isResolved: false,
									date: today,
								});
							}

							return false;
						} else {
							//recebido TEXTO e SEM Imagem
							//console.log("soh vitoria seus putos");
							const _id = mongoose.Types.ObjectId();
							const timeElapsed = Date.now();
							const today = new Date(timeElapsed);
							const auxImg = {
								name: "no data",
								desc: "no data",
								img: {
									data: "no data",
									contentType: "no data",
								},
							};
							if (
								ctx.meta.$multipart.cityid &&
								ctx.meta.$multipart.street &&
								ctx.meta.$multipart.streetNumber &&
								ctx.meta.$multipart.referencePoint &&
								ctx.meta.$multipart.latitude &&
								ctx.meta.$multipart.longitude &&
								ctx.meta.$multipart.description
							) {
								console.log(
									"foram recebidos dados de texto, sem imagem"
								);

								return AccidentRecords.create({
									_id,
									cityid: ctx.meta.$multipart.cityid,
									street: ctx.meta.$multipart.street,
									streetNumber:
										ctx.meta.$multipart.streetNumber,
									referencePoint:
										ctx.meta.$multipart.referencePoint,
									latitude: ctx.meta.$multipart.latitude,
									longitude: ctx.meta.$multipart.longitude,
									description:
										ctx.meta.$multipart.description,
									images: auxImg,
									isResolved: false,
									date: today,
								});
							}
						}
						return false;
					}
				}
				/*
				console.log("data has been received: ", ctx);
				//const form = new formidable.IncomingForm();
				//console.log(form);

				const _id = mongoose.Types.ObjectId();
				const timeElapsed = Date.now();
				const today = new Date(timeElapsed);
				if (ctx.params.data) {
					if (
						ctx.params.data.cityid &&
						ctx.params.data.street &&
						ctx.params.data.streetNumber &&
						ctx.params.data.referencePoint &&
						ctx.params.data.latitude &&
						ctx.params.data.longitude &&
						ctx.params.data.description
					) {
						return AccidentRecords.create({
							_id,
							cityid: ctx.params.data.cityid,
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
			*/
			},
		},

		getAll: {
			async handler(ctx) {
				return await AccidentRecords.find();
			},
		},

		getById: {
			async handler(ctx) {
				if (ctx.params.data && ctx.params.data.id) {
					return await AccidentRecords.find({
						_id: ctx.params.data.id,
					});
				}
				return false;
			},
		},

		update: {
			async handler(ctx) {
				//console.log(ctx.meta.$multipart);
				/*
				if (ctx.params.data && ctx.params.data.id) {
					return await AccidentRecords.updateOne(
						{ _id: ctx.params.data.id },
						{
							$set: {
								cityid: ctx.params.data.cityid,
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
				}*/
				return false;
			},
		},

		updateResolved: {
			async handler(ctx) {
				if (ctx.params.data && ctx.params.data.id) {
					return await AccidentRecords.updateOne(
						{ _id: ctx.params.data.id },
						{ $set: { isResolved: true } }
					);
				}
				return false;
			},
		},

		delete: {
			async handler(ctx) {
				if (ctx.params.data && ctx.params.data.id) {
					return await AccidentRecords.deleteOne({
						_id: ctx.params.data.id,
					});
				}
				return false;
			},
		},
	},

	created() {
		console.log("Assets service instance created");
	},
};
