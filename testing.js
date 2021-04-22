/* const user = require("./models/User");
const tweet = require("./models/Tweet");

const userTest = new user({
  firstName: "hello",
  lastName: "world",
  userName: "loquequieras",
  email: "loquequieras@yahoo.com",
  password: "1234",
});
userTest.save();

const newTweet = async () => {
  try {
    const newTweet = new tweet({
      text: "mi mama me mima",
      user: userTest,
    });
    await newTweet.save();
  } catch (err) {
    console.log(err);
  }
};

newTweet(); */
