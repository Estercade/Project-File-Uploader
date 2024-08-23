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
    res.render("signup", { title: "Sign up", user: req.user });
}

async function getUploadForm(req, res, next) {
    if (req.isAuthenticated()) {
        const messages = req.session.messages;
        req.session.messages = [];
        res.render("upload", { title: "Upload a file", user: req.user, messages: messages });
    } else {
        req.session.messages = ["Sorry, you don't have access to that."]
        res.redirect("/");
    }
}

module.exports = {
    getIndex,
    getLoginForm,
    getSignupForm,
    getUploadForm,
}