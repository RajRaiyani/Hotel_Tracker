const express = require("express");
const router = express.Router();
const {exp,params,hey} = require("./../controllers/exp");

router.route("/").get(exp);
router.route("/params/hey").get(hey);
router.route("/params/:value").get(params);

// router.route("/images").get(express.static("/Users/r.p.raiyani/Desktop/Hotel Tracker/images"))

module.exports = router;