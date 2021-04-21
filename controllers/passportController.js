const passport = require("passport");

module.exports = passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login",
});
