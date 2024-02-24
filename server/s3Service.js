const { S3 } = require("aws-sdk");
const uuid = require("uuid").v4;

const s3 = new S3();

exports.s3Upload = async (files) => {
    const params = files.map((file) =>  {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `uploads/${uuid()}-${file.originalname}`,
            Body: file.buffer
        }
    })

    return await Promise.all(
        params.map((param) => s3.upload(param).promise())
    )
}

exports.s3Uploads = async () => {
    let urlArr = [];

    try {
        const data = await s3.listObjects({ Bucket: process.env.AWS_BUCKET_NAME }).promise();
        console.log("data: ", data);

        const baseUrl = `https://s3.amazonaws.com/${process.env.AWS_BUCKET_NAME}/`;
        urlArr = data.Contents.map(e => baseUrl + e.Key);

        console.log("urlArr: ", urlArr);
    } catch (err) {
        console.log(err);
    }

    return urlArr;
};
