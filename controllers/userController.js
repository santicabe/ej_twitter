const User = require("../models/User");
const Tweet = require("../models/Tweet");
const moment = require("moment-timezone");

const tweetCreate = async (req, res) => {
  const user = await User.findOne({ userName: req.user.userToken.userName });
  try {
    const tweet = new Tweet({
      text: req.body.text,
      user: user,
      createdAt: moment()
        .tz("Pacific/Galapagos")
        .format("YYYY-MM-DDTHH:mm:ss.SSS"),
    });
    await tweet.save();
    user.listTweets.push(tweet);
    await user.save();
    res.json(tweet);
  } catch (error) {
    console.log(error);
  }
};

const tweetDelete = async (req, res) => {
  try {
    const tweetId = req.params.id;
    if (req.user.listTweets.includes(tweetId)) {
      const positionTweet = req.user.listTweets.indexOf(tweetId);
      req.user.listTweets.splice(positionTweet, 1);
      await req.user.save();
      await Tweet.findByIdAndDelete(tweetId);
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
  console.log(req.body.username);
  console.log(req.body.user);

  if (req.body.username === req.body.user.userName) {
    res.send(false); //no se puede hacer nada
    console.log("no te podes seguir a vos mismo");
  } else {
    const follow = await User.findOne({ userName: req.body.username });
    const user = await User.findOne({ userName: req.body.user.userName });

    console.log(follow);
    console.log(user);

    if (follow.listFollowers.includes(user._id)) {
      const positionUser = follow.listFollowers.indexOf(user._id);
      follow.listFollowers.splice(positionUser, 1);
      await follow.save();
      const positionFollow = user.listFollowing.indexOf(follow._id);
      user.listFollowing.splice(positionFollow, 1);
      user.save();
      res.send(false); //no se hace nada
      console.log("unfollow");
    } else {
      follow.listFollowers.push(user);
      await follow.save();
      user.listFollowing.push(follow);
      user.save();
      res.json(user.listFollowing);
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
  const tweet = await Tweet.findOne({ _id: req.params.id });
  const user = await User.findById(tweet.user);
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
