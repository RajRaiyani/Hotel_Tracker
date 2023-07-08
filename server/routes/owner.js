const express = require("express");
const router = express.Router();
const isOwnerLoggedIn = require("./../middlewares/isOwnerLoggedIn");
const {owner,addTable,getTables,addItem,getItems} = require("./../controllers/ownerController");


router.route("/").get(isOwnerLoggedIn,owner);
router.route("/table/add").post(isOwnerLoggedIn,addTable);
router.route("/item/add").post(isOwnerLoggedIn,addItem);


module.exports = router;