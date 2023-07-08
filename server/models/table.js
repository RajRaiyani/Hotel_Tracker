const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	hotel_id:mongoose.Schema.Types.ObjectId,
	name:String,
});

module.exports = mongoose.model("table",schema);