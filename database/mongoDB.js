const mongoose = require("mongoose");
const data = require("../seeder");

mongoose.connect("mongodb://localhost/ej-twitter", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection
  .once("open", () => {
    console.log("Connection with Mongo is activated");
    //data();  //Al descomentar alimenta la DB
  })
  .on("error", (error) => console.log(error));
