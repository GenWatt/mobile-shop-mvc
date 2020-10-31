const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../modules/User");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "login" }, async (login, password, done) => {
      try {
        const user = await User.findOne({ login });

        if (!user) return done(null, false, { message: "User is not register!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          done(null, user);
        } else done(null, false, { message: "Password incorrect!" });
      } catch (error) {
        console.log(error);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
