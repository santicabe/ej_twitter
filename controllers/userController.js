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

//ADD ERROR CODES TO THE ERRORS
const tweetDelete = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const user = await User.findOne({ _id: req.user._id });
    if (user.listTweets.includes(tweetId)) {
      const user = await User.findOne({ userName: req.user.userName });
      const positionTweet = user.listTweets.indexOf(tweetId);
      await user.listTweets.splice(positionTweet, 1);
      user.save();
      Tweet.findOne({ _id: tweetId }).remove();
      res.redirect("/username/" + req.user.userName);
    } else {
      res.send("INVALID USER");
    }
  } catch (error) {
    console.log(error);
    res.send("ERROR");
  }
};

module.exports = { tweetCreate, tweetDelete };
