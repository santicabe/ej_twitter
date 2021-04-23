//USER CONTROLLER
//tweetCreate POST
//tweetDelete DELETE
//followUser PATCH
//editProfile PATCH
//logout GET or POST?

const User = require("../models/User");
const Tweet = require("../models/Tweet");
const moment = require("moment-timezone");

const tweetCreate = async (req, res) => {
  try {
    const tweet = new Tweet({
      text: req.body.text,
      user: req.user,
      createdAt: moment().tz("Pacific/Galapagos").format("LLL"),
    });
    if (req.user) {
      await tweet.save();

      const user = await User.findOne({ userName: req.user.userName });
      await user.listTweets.push(tweet);
      user.save();
    }
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { tweetCreate };
