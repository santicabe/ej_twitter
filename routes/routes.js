const { render } = require("ejs");
const express = require("express");
const router = express.Router();

const publicController = require("../controllers/publicController");

router.get("/", (req, res) => res.render("login", {}));
router.post("/", (req, res) => res.render("login", {}));

router.get("/register", (req, res) => res.render("register", {}));
router.post("/register", publicController.sendRegister);

module.exports = router;
