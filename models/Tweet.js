const { Schema, model } = require("mongoose");
const User = require("./User");

const tweetsSchema = new Schema({
  text: {
    type: String,
    required: true,
    maxLength: 140,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = model("tweets", tweetsSchema);

//Text - STRING
//Autor - STRING?
//creat date - DATE
//likes - NUMBER
