const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const publicController = require("../controllers/publicController");
const userController = require("../controllers/userController");
const loginControl = require("../controllers/loginController");
const authenticate = require("../middleware/authenticate");

router.get("/", (req, res) => res.render("login", {}));
///ADD MESAGE WHEN PASSWORD IS WRONG - PASSPORT FLASH
router.post("/", loginControl);

router.get("/register", (req, res) => res.render("register", {}));
router.post("/register", publicController.sendRegister);

router.get("/home", authenticate, (req, res) => res.render("home", {}));
router.post("/home", authenticate, userController.tweetCreate);

router.get("/username/:username", publicController.showUser);
router.post("/delete/:id", userController.tweetDelete);

router.post("/follow/:username", userController.followUser);
router.post("/unfollow/:username", userController.unfollowUser);

module.exports = router;
