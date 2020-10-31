module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) return next();

    req.flash("error", "Please log in");
    res.redirect("/user/login");
  },

  isAdmin: (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) return next();

    res.redirect("/products");
  },
};
