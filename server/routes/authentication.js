const express = require("express");
const router = express.Router();
const {SignIn,LogIn,OwnerLogIn} = require("../controllers/authenticationController");
const isLoggedIn = require("./../middlewares/isLoggedIn");


router.route("/SignIn").post(SignIn);
router.route("/LogIn").post(LogIn);
router.route("/ownerLogIn").post(isLoggedIn,OwnerLogIn);

module.exports = router;

