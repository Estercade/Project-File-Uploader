const { Router } = require("express");
const indexController = require("../controllers/indexController");
const authController = require("../controllers/authController");
const uploadsController = require("../controllers/uploadsController");

const indexRouter = Router();

indexRouter.get("/", indexController.getIndex);
indexRouter.get("/login", indexController.getLoginForm);
indexRouter.post("/login", authController.authenticateUser);
indexRouter.get("/logout", authController.logoutUser);
indexRouter.get("/signup", indexController.getSignupForm);
indexRouter.post("/signup", authController.createUser);
indexRouter.get("/upload", indexController.getUploadForm);
indexRouter.post("/upload", uploadsController.uploadFile);
indexRouter.get("/files", uploadsController.getUserFiles);

indexRouter.use((err, req, res, next) => {
    if (err) {
        res.status(404).send("Oops! 404 Not Found.");
    }
})

module.exports = indexRouter;