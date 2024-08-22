async function getIndex(req, res, next) {
    const messages = req.session.messages;
    req.session.messages = [];
    res.render("index", { title: "Index", user: req.user, messages: messages });
}

async function getLoginForm(req, res, next) {
    const messages = req.session.messages;
    req.session.messages = [];
    res.render("login", { title: "Log in", user: req.user, messages: messages });
}

async function getSignupForm(req, res, next) {
    const messages = req.session.messages;
    req.session.messages = [];
    res.render("signup", { title: "Sign up", user: req.user, messages: messages });
}

async function getUploadForm(req, res, next) {
    const messages = req.session.messages;
    req.session.messages = [];
    res.render("upload", { title: "Upload a file", user: req.user, messages: messages });
}

module.exports = {
    getIndex,
    getLoginForm,
    getSignupForm,
    getUploadForm,
}