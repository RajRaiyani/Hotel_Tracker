const express = require("express");
const router = express.Router();
const {SignIn,LogIn,OwnerLogIn} = require("../controllers/authenticationController");
const isLoggedIn = require("./../middlewares/isLoggedIn");


router.route("/signin").post(SignIn);
router.route("/login").post(LogIn);
router.route("/ownerlogin").post(isLoggedIn,OwnerLogIn);

module.exports = router;

