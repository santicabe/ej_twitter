const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const publicController = require("../controllers/publicController");
const userController = require("../controllers/userController");
const loginControl = require("../controllers/loginController");
const authenticate = require("../middleware/authenticate");

router.get("/login", (req, res) => res.render("login", {}));
///ADD MESAGE WHEN PASSWORD IS WRONG - PASSPORT FLASH
router.post("/login", loginControl);

router.get("/register", (req, res) => res.render("register", {}));
router.post("/register", publicController.sendRegister);

router.get("/home", authenticate, (req, res) => res.render("home", {}));
router.post("/home", authenticate, userController.tweetCreate);

router.get("/username/:username", publicController.showUser);

module.exports = router;
