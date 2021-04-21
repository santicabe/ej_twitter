const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

require("./database/mongoDB");

app.use(express.static(__dirname + "/public"));

//PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT
//PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT
//PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT
const session = require("express-session");
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
app.use(passport.session());

//UPDATE TO MONGOOSE
passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async function (req, username, password, done) {
      try {
        /*         const user = await Author.findOne({ where: { fullName: username } }); */
        if (!user) {
          return done(null, false, {
            message: "Usuario y/o contraseña incorrectos",
          });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, {
            message: "Usuario y/o contraseña incorrectos",
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//UPDATE TO MONGOOSE
passport.deserializeUser(function (id, done) {
  /*   Author.findByPk(id)
    . */ then((user) => {
    done(null, user);
  }).catch((error) => {
    done(error, user);
  });
});
//PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT
//PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT
//PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT PASSPORT

const routes = require("./routes/routes");
app.use(routes);

app.listen(port, () => console.log(`Servidor en http://localhost:${port}/`));
