const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const users = require("../models/users");

validateUser = [
    body("username").custom(async value => {
        const user = await users.getUserbyUsername(value);
        if (user) {
            throw new Error("Username is already in use.");
        }
    }),
    body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long."),
    body("passwordConfirmation").custom((value, { req }) => {
        return value === req.body.password;
    }).withMessage("Passwords do not match.")
]

createUser = [
    validateUser,
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("signup", {
                title: "Sign up",
                errors: errors.array()
            });
        }
        const username = req.body.username;
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (err) {
                next(err);
            } else {
                try {
                    await users.createUser(username, hashedPassword);
                } catch (err) {
                    next(err);
                }
            }
        })
        res.redirect("/login");
    }
]

async function authenticateUser(req, res, next) {
    passport.authenticate("local", {
        successRedirect: "/",
        successMessage: "You have successfully logged in!",
        failureRedirect: "/login",
        failureMessage: true,
    })(req, res, next);
}

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await users.getUserbyUsername(username);
            if (!user) {
                return done(null, false, { message: "Incorrect username or password." });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect username or password." });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (user_id, done) => {
    try {
        const user = await users.getUserForDeserialization(user_id)
        done(null, user);
    } catch (err) {
        done(err);
    }
})

function logoutUser(req, res, next) {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};

module.exports = {
    createUser,
    authenticateUser,
    logoutUser,
}