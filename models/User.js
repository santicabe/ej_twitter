const { Schema, model } = require("mongoose");

const usersSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  profileFoto: {
    type: String,
    //default: defaultFoto
  },
  listTweets: {
    type: [String],
    //enum: [tweets]
  },
  listFollowing: {
    type: [String],
    //enum: [users]
  },
  listFollowers: {
    type: [String],
    //enum: [users]
  },
});

module.exports = model("users", usersSchema);

//name - STRING
//lname - STRING
//username - STRING
//email - STRING
//descr - STRING
//foto - STRING
//lista tweets - ARRAY?
//lista seguidos - ARRAY
//lista seguidores - ARRAY
