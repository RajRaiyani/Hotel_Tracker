const express = require("express");
const router = express.Router();
const {home,getTables,getItems, getOrder} = require("./../controllers/homeController");
const isLoggedIn = require("./../middlewares/isLoggedIn");

router.route("/home").get(isLoggedIn,home);
router.route("/getTables").get(isLoggedIn,getTables);
router.route("/getItems").get(isLoggedIn,getItems);
router.route("/getOrder/:id").get(isLoggedIn,getOrder);


module.exports = router;