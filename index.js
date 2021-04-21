const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

require("./database/mongoDB");
const user = require("./models/User");

const newUser = async () => {
  try {
    const userTest = new user({
      firstName: "hello",
      lastName: "world",
      userName: "loquequieras",
      email: "loquequieras@yahoo.com",
    });
    await userTest.save();
  } catch (err) {
    console.log(err);
  }
};

newUser();

//const routes = require("./routes/routes");
//app.use(routes);

app.listen(port, () => console.log(`Servidor en http://localhost:${port}/`));
