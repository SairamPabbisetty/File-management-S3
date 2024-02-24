require("dotenv").config()
const express = require("express")
const cors = require("cors")
const multer = require("multer")
const { s3Upload, s3Uploads } = require("./s3Service.js");

const app = express();

app.use(cors())

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    cb(null, true)
}

const upload = multer({ storage, fileFilter })

app.post("/upload", upload.array("file"), async (req, res) => {
    try {
        const result = await s3Upload(req.files);
        res.json({ status: "success", result})
    } catch(err) {
        console.log(err);
    }
})

app.get("/uploads", async (req, res, next) => {
    try {
        const result = await s3Uploads();
        console.log("result: ", result);
        res.json({ status: "success", result})
    } catch(err) {
        console.log(err);
    }
})

app.listen(3000, () => {
    console.log("Server is at 3000....");
})