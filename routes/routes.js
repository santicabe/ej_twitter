const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const publicController = require("../controllers/publicController");
const userController = require("../controllers/userController");
const loginControl = require("../controllers/loginController");
const authenticate = require("../middleware/authenticate");

router.get("/", (req, res) => res.render("login", {}));
router.post("/", loginControl);

router.get("/register", (req, res) => res.render("register", {}));
router.post("/register", publicController.sendRegister);

router.post("/deleteUser/:username", authenticate, publicController.deleteUser);

router.get("/home", authenticate, publicController.showHome);
router.post("/home", authenticate, userController.tweetCreate);

router.get("/username/:username", authenticate, publicController.showUser);
router.post("/delete/:id", userController.tweetDelete);

router.post("/follow/:username", userController.followUser);
router.post("/unfollow/:username", userController.unfollowUser);

router.post("/like/:id", userController.tweetLike);

//LOGIN - POST
//router.post("/", loginControl);

//REGISTER USER - POST
router.post("/test", (req, res) => {
  const test = req.body;
  console.log(req.body.userName);
  console.log(test);
  res.json(test);
});

//DELETE USER - DELETE
//router.post("/deleteUser/:username", authenticate, publicController.deleteUser);

//GET TWEETS - GET
//router.get("/home", authenticate, publicController.showHome);

//CREATE TWEET - POST
//router.post("/home", authenticate, userController.tweetCreate);

//GET USER TWEETS - GET
//router.get("/username/:username", authenticate, publicController.showUser);

//DELETE TWEET - DELETE
//router.post("/delete/:id", userController.tweetDelete);

//FOLLOW USER - PATCH?
//router.post("/follow/:username", userController.followUser);

//UNFOLLOW USER - PATCH?
//router.post("/unfollow/:username", userController.unfollowUser);

//LIKE TWEET - PATCH?
//router.post("/like/:id", userController.tweetLike);

router.get("/apiRest", (req, res) => res.json({ hello: "goodbye" }));

module.exports = router;
