const express = require("express");
const router = express.Router();
const isLoggedIn = require("./../middlewares/isLoggedIn");
const { GetAllOrder, OrderComplete } = require("../controllers/chefController");


router.route("/").get(isLoggedIn,GetAllOrder);
router.route("/orderComplete").post(isLoggedIn,OrderComplete);


module.exports = router;
