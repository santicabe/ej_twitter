//const db = require("./database/mongoDB");
const faker = require("faker");
const User = require("./models/User");
const Tweet = require("./models/Tweet");

faker.locale = "es";

/* function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
 */
const data = async () => {
  for (let i = 0; i < 15; i++) {
    const newUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userName: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await User.create(newUser);
    console.log(newUser);
  }

  const users = await User.find();

  for (let i = 0; i < 15; i++) {
    const random = Math.floor(Math.random() * 16);
    const newTweet = {
      text: faker.lorem.words(5),
      user: users[random].id,
    };
    await Tweet.create(newTweet);
    console.log(newTweet);
  }
};

//data();
module.exports = data;
