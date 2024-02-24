require("dotenv").config()
const express = require("express")
const cors = require("cors")
const multer = require("multer")
const { s3Uploadv2 } = require("./s3Service.js");

const app = express();

app.use(cors())

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    cb(null, true)
}

const upload = multer({ storage, fileFilter })

app.post("/uploads", upload.array("file"), async (req, res) => {
    try {
        const result = await s3Uploadv2(req.files);
        res.json({ status: "success", result})
    } catch(err) {
        console.log(err);
    }
})

app.listen(3000, () => {
    console.log("Server is at 3000....");
})