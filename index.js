const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

require("./database/mongoDB");

app.use(express.static(__dirname + "/public"));

const passport = require("passport");
const session = require("express-session");

app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./controllers/passportController");

const routes = require("./routes/routes");
app.use(routes);

app.listen(port, () => console.log(`Servidor en http://localhost:${port}/`));
