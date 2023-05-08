const express = require("express");
const { table, placeOrder } = require("../controllers/waiterController");
const router = express.Router();
const isLoggedIn = require("./../middlewares/isLoggedIn");


router.route("/table/:id").get(isLoggedIn,table);
router.route("/table/placeOrder").post(isLoggedIn,placeOrder);

module.exports = router;