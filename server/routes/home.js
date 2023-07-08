const express = require("express");
const router = express.Router();
const {home,getAllTables,getItems, getOrder} = require("./../controllers/homeController");
const isLoggedIn = require("./../middlewares/isLoggedIn");

router.route("/").get(isLoggedIn,home);
router.route("/table").get(isLoggedIn,getAllTables);
router.route("/item").get(isLoggedIn,getItems);
router.route("/getOrder/:id").get(isLoggedIn,getOrder);


module.exports = router;