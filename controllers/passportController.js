const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcryptjs");

const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async function (req, username, password, done) {
      try {
        const user = await User.findOne({ userName: username });
        if (!user) {
          return done(null, false, {
            message: "Usuario incorrectos",
          });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, {
            message: "Contraseña incorrectos",
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error, user);
    });
});
