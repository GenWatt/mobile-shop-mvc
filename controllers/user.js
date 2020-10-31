const User = require("../modules/User");
const passport = require("passport");

module.exports.handleErrors = (error) => {
  let err = [];

  if (error.code === 11000) err.push("User already exist!");
  if (error.errors) Object.values(error.errors).forEach(({ properties }) => err.push(properties.message));
  return err;
};

module.exports.register_post = async (req, res) => {
  const { login, email, password } = req.body;
  const user = {
    login,
    email,
    password,
    admin: false,
  };

  try {
    await User.create(user);
    res.redirect("login");
  } catch (err) {
    let error = handleErrors(err);

    req.flash("error", error);
    res.redirect("/user/register");
  }
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.register_get = (req, res) => {
  res.render("register");
};

module.exports.log_out_get = (req, res) => {
  req.logout();
  res.redirect("/user/login");
};

module.exports.login_post = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/products",
    failureRedirect: "/user/login",
    failureFlash: true,
  })(req, res, next);
};
