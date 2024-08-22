const multer = require("multer");
const upload = multer({ dest: './public/data/uploads' });
const uploads = require("../models/uploads");

uploadFile = [
    upload.single('uploadedFile'),
    async (req, res) => {
        const file = await uploads.uploadFile(req.file, req.body, req.user);
        console.log(file);
        if (file) {
            req.session.message = ["File successfully uploaded!"];
            res.redirect("/");
        } else {
            req.session.message = ["There was an issue uploading your file. Please try again."];
            res.redirect("/upload");
        }
    }
]

module.exports = {
    uploadFile,
}