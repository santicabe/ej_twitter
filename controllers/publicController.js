const User = require("../models/User");
const Tweet = require("../models/Tweet");
const hash = require("../database/bcrypt");
const path = require("path");
const { date } = require("faker");

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
  } catch (err) {
    console.log(err);
  }
};

const showHome = async (req, res) => {
  const username = req.user.userToken.userName;
  const user = await User.findOne({ userName: username });
  await Tweet.find({
    user: [...user.listFollowing, user._id],
  })
    .populate({
      path: "user",
      model: User,
    })
    .sort("-createdAt")
    .exec((err, tweets) => {
      res.json({ tweets });
    });
};

const showUser = async (req, res) => {
  await User.findOne({ userName: req.params.username })
    .populate({ path: "listTweets", model: Tweet })
    .sort("-createdAt")
    .exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        const logUser = req.user;
        let likeTotal = 0;
        for (let i = 0; i < data.listTweets.length; i++) {
          likeTotal = likeTotal + data.listTweets[i].likes.length;
        }

        res.json({ data, likeTotal, logUser });
      }
    });
};

const deleteUser = async (req, res) => {
  const users = await User.find({
    _id: [...req.user.listFollowers, ...req.user.listFollowing],
  });

  users.forEach(async (element) => {
    for (let i = 0; i < element.listFollowing.length; i++) {
      if (String(element.listFollowing[i]) === String(req.user._id)) {
        element.listFollowing.splice(i, 1);
      }
    }
    for (let i = 0; i < element.listFollowers.length; i++) {
      if (String(element.listFollowers[i]) === String(req.user._id)) {
        element.listFollowers.splice(i, 1);
      }
    }
    await element.save();
  });

  await Tweet.deleteMany({ user: [req.user._id] }).exec();

  await User.findOneAndDelete({ userName: req.user.userName }).exec();

  res.redirect("/");
};

module.exports = { sendRegister, showUser, showHome, deleteUser };
