//PUBLIC CONTROLLER
//showHome GET
//showUser GET
//showLogin GET
//sendLogin POST
//showRegister GET
//sendRegister POST

const User = require("../models/User");
const Tweet = require("../models/Tweet");
const hash = require("../database/bcrypt");

//DEVOLVER MENSAJE DE ERROR SI USUARIO ESTA REPETIDO EN DB
const sendRegister = async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: hash(req.body.password),
    });
    await user.save();
    res.redirect("/home");
  } catch (err) {
    console.log(err);
  }
};

const showUser = async (req, res) => {
  const user = await User.findOne({ userName: req.params.username });
  const tweets = await Tweet.find({ user: user });
  console.log(tweets);

  res.render("user");
};

module.exports = { sendRegister, showUser };
