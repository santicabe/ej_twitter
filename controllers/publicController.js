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
const path = require("path");

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

const showHome = async (req, res) => {
  await Tweet.find({ user: [req.user.listFollowing, req.user._id] })
    .populate({
      path: "user",
      model: User,
    })
    .sort("-createdAt")
    .exec((err, tweets) => {
      res.render("home", { tweets });
    });
};

const showUser = async (req, res) => {
  await User.findOne({ userName: req.params.username })
    .populate({ path: "listTweets", model: Tweet })
    .exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.render("user", { data });
      }
    });
};

module.exports = { sendRegister, showUser, showHome };
