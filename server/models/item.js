const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	user_id : mongoose.Schema.Types.ObjectId,
	number : Number,
	name : String,
	price : Number,
})

module.exports = mongoose.model("item",schema);