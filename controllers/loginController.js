const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const user = req.body;
  const loggedUser = await User.findOne({
    userName: user.userName,
  });
  if (!loggedUser) {
    res.json({ token: "", error: "User not found" });
  } else {
    if (bcrypt.compareSync(user.password, loggedUser.password)) {
      jwt.sign({ user }, "/YGVcde3", (err, token) => {
        res.json({ token: token, user: loggedUser });
      });
    } else {
      res.json({ token: "", error: "Wrong password" });
    }
  }
};

module.exports = login;
