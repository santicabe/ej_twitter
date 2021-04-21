const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

require("./database/mongoDB");

app.use(express.static(__dirname + "/public"));

//PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT
/* const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session()); */
//PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT

const routes = require("./routes/routes");
app.use(routes);

app.listen(port, () => console.log(`Servidor en http://localhost:${port}/`));
