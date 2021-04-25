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

router.post("/deleteUser/:username", authenticate, publicController.deleteUser);

router.get("/home", authenticate, publicController.showHome);
router.post("/home", authenticate, userController.tweetCreate);

router.get("/username/:username", publicController.showUser);
router.post("/delete/:id", userController.tweetDelete);

router.post("/follow/:username", userController.followUser);
router.post("/unfollow/:username", userController.unfollowUser);

router.post("/like/:id", userController.tweetLike);

module.exports = router;
