const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/ej-twitter", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => console.log("Connection with Mongo is activated"))
  .on("error", (error) => console.log(error));
