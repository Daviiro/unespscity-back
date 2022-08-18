const Images = require("../model/Images")
const aws = require("aws-sdk");
const { accessKeyId, secretAccessKey } = require("../../../../config");

aws.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: "sa-east-1",
    ACL: "public-read"
})

const s3 = new aws.S3({ params: { Bucket: 'unesp-s-city' } });


module.exports = {
    name: "image-service",
    aliases: {
        "POST /api/image"(req, response) {
            const ref = this;
            const file = req.images;
            return ref.broker.call("praca-service.uploadFile", { file })
                .then(res => {
                    ref.logger.info("File uploaded successfully!", res);
                    response.end(res);
                })
                .catch(err => {
                    ref.logger.error("File upload error!", err);
                    ref.sendError(req, res, err);
                });
        },
    },
    actions: {
        create: {
            params: {
                idObj: "string",
                images: ["string"],
            },
            async handler(ctx) {
                if (ctx.params) {
                    if (ctx.params.images && ctx.params.idObj) {
                        return await this.uploadToS3(ctx.params.images);
                        /*
                        return Images.create({
                            idObj: ctx.params.idObj,
                            imagesLink: ctx.params.images,
                        })*/
                    }
                }
                return false
            }
        },

        getAll: {
            async handler(ctx) {
                return await Images.find()
            }
        },
    },
    methods: {
        async uploadToS3(file) {
            const buffer = new Buffer.from(file, "base64");
            const name = "teste3123"
            const params = {
                Key: name,
                Body: buffer,
                ContentEncoding: 'base64',
                ContentType: 'image/jpeg'
            };
            return await new Promise(function (resolve, reject) {
                s3.putObject(params, function (err, data) {
                    if (err) {
                        console.log(err);
                        console.log('Error uploading data: ', params);
                    } else {
                        console.log('successfully uploaded the image!');
                        resolve(JSON.stringify(data))

                    }
                });
                // s3.createBucket(function () {
                //     s3.upload(params, function (err, data) {
                //         console.log("ola");
                //         if (err) {
                //             console.log('error in callback');
                //             console.log(err);
                //         }
                //         console.log(JSON.stringify(data));
                //         resolve(JSON.stringify(data));
                //     });
                // })
            });
        },
    }

}