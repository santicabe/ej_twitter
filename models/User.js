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
    unique: true,
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
  listTweets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  ],
  listFollowing: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  listFollowers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
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
