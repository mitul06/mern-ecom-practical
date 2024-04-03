const passport = require("passport");
const bcrypt = require("bcrypt");
const { UserModel } = require("../users/user");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },

    (email, password, done) => {
      UserModel.findOne({ $or: [{ email }] })
        .then(async (user) => {
          if (!user) {
            return done(null, false, { message: "User Does not exist" });
          } else {
            const isMathPass = await bcrypt.compare(password, user.password);
            if (!isMathPass) {
              return done(null, false, {
                message: "Invalid email and password",
              });
            }
            return done(null, user);
          }
        })
        .catch((err) => {
          if (err) {
            return done(err);
          }
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  if (user) {
    return done(null, user);
  } else {
    return done("User Doesn't exist", null);
  }
});

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.send({
      success: false,
      message: "You are not log in",
    });
  }
};

module.exports = {
  isAuthenticated,
};
