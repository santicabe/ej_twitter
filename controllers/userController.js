//USER CONTROLLER
//tweetCreate POST
//tweetDelete DELETE
//followUser PATCH
//editProfile PATCH
//logout GET or POST?

const Tweet = require("../models/Tweet");
const moment = require("moment-timezone");

const tweetCreate = async (req, res) => {
  try {
    const tweet = new Tweet({
      text: req.body.text,
      user: req.user,
      createdAt: moment().tz("Pacific/Galapagos").format("LLL"),
    });
    await tweet.save();
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
};

const user = require("../models/User");
const tweet = require("../models/Tweet");

//here goes controllers

module.exports = { tweetCreate };
