const { Schema, model } = require("mongoose");

const tweetsSchema = new Schema({
  text: {
    type: String,
    required: true,
    maxLength: 140,
  },
  user: {
    type: Number,
    //enum: [users]
  },
  createdAt: {
    type: Date,
  },
  likes: {
    type: Number,
  },
});

module.exports = model("tweets", tweetsSchema);

//Text - STRING
//Autor - STRING?
//creat date - DATE
//likes - NUMBER
