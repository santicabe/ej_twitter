const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkJwt = require("express-jwt");

const login = async (req, res) => {
  const user = req.body;
  const userToken = { userName: user.userName };
  const loggedUser = await User.findOne({
    userName: user.userName,
  });
  if (!loggedUser) {
    res.json({ token: "", error: "User not found" });
  } else {
    if (bcrypt.compareSync(user.password, loggedUser.password)) {
      jwt.sign({ userToken }, "/YGVcde3", (err, token) => {
        res.json({ token: token, user: loggedUser });
      });
    } else {
      res.json({ token: "", error: "Wrong password" });
    }
  }
};

module.exports = { login };
