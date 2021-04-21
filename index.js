const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

require("./database/mongoDB");

const routes = require("./routes/routes");
app.use(routes);

app.listen(port, () => console.log(`Servidor en http://localhost:${port}/`));
