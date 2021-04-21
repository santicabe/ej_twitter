//PUBLIC CONTROLLER
//showHome GET
//showUser GET
//showLogin GET
//sendLogin POST
//showRegister GET
//sendRegister POST

const User = require("../models/User");
const tweet = require("../models/Tweet");

const sendRegister = async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    //CAMBIAR REDIRECT DE HOME A LOGIN
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendRegister };
