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

const followUser = async (req, res) => {
  const follow = await User.findOne({ userName: req.params.username });
  const user = req.user;

  if (String(follow._id) == String(user._id)) {
    res.redirect("/username/" + req.params.username);
  } else {
    if (follow.listFollowers.includes(user._id)) {
      res.redirect("/username/" + req.params.username);
    } else {
      await follow.listFollowers.push(user);
      follow.save();
      await user.listFollowing.push(follow);
      user.save();
      res.redirect("/username/" + req.params.username);
    }
  }
};

const unfollowUser = async (req, res) => {
  const follow = await User.findOne({ userName: req.params.username });
  const user = req.user;
  const userId = req.user._id;

  if (follow.listFollowers.includes(userId)) {
    const positionUser = follow.listFollowers.indexOf(userId);
    await follow.listFollowers.splice(positionUser, 1);
    follow.save();
    const positionFollow = user.listFollowing.indexOf(follow._id);
    await user.listFollowing.splice(positionFollow, 1);
    user.save();
    res.redirect("/username/" + req.params.username);
  } else {
    res.redirect("/username/" + req.params.username);
  }
};

const tweetLike = async (req, res) => {
  const userId = req.user._id;

  console.log("1 -" + req.params.id);
  console.log("2 -" + req.user);
  const tweet = await Tweet.findOne({ _id: req.params.id });
  const user = await User.findById(tweet.user);
  console.log("3 -" + tweet);

  if (tweet.likes.includes(userId)) {
    const positionLike = tweet.likes.indexOf(userId);
    await tweet.likes.splice(positionLike, 1);
    tweet.save();
    res.redirect("/username/" + user.userName);
  } else {
    await tweet.likes.push(userId);
    tweet.save();
    res.redirect("/username/" + user.userName);
  }
};

module.exports = {
  tweetCreate,
  tweetDelete,
  followUser,
  unfollowUser,
  tweetLike,
};
