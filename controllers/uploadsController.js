const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploads = require("../models/uploads");
const { Readable } = require("stream");
const cloudinary = require("cloudinary").v2;

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// middleware to await Cloudinary upload to complete
async function uploadToCloudinary(req, res, next) {
    let result = await streamUpload(req.file, req.body);
    req.uploadResult = result;
    next();
}

// Cloudinary upload wrapped in promise
function streamUpload(file, body) {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            {
                visibility: "public",
                // strip file extension from originalname
                public_id: file.originalname.replace(/\.[^/.]+$/, "")
            },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
        Readable.from(file.buffer).pipe(stream);
    });
}

// array of middleware for uploading file
uploadFile = [
    upload.single('uploadedFile'),
    uploadToCloudinary,
    async (req, res) => {
        const file = await uploads.uploadFile(req.file, req.uploadResult, req.body, req.user);
        console.log(req.file);
        console.log(req.uploadResult);
        if (file) {
            req.session.message = ["File successfully uploaded!"];
            res.redirect("/");
        } else {
            req.session.message = ["There was an issue uploading your file. Please try again."];
            res.redirect("/upload");
        }
    }
]

async function getUserFiles(req, res) {
    const filesArray = await uploads.getFilesByUserId(req.user.id);
    filesArray.forEach((file) => {
        file.size = convertBytesToSize(Number(file.size));
    })
    res.render("files", { title: "My files", user: req.user, files: filesArray });
}

function convertBytesToSize(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB"];
    let i = Math.floor(Math.log(bytes) / Math.log(1024));
    return ((bytes / Math.pow(1024, i)).toFixed(1) + ` ${sizes[i]}`);
}

module.exports = {
    uploadFile,
    getUserFiles
}