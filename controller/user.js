const User = require("../models/user")

module.exports.rendersignUpForm = (req, res,) => {
    res.render("user/signup.ejs");
}

module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        // Promisify login
        await new Promise((resolve, reject) => {
            req.login(registeredUser, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");

    } catch (err) {
        next(err);
    }
};

module.exports.renderloginForm = (req, res) => {
    res.render("user/login.ejs");

}

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back to wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}


module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "logout Successfully");
        res.redirect("/listings");
    });
}