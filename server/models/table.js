const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	user_id:mongoose.Schema.Types.ObjectId,
	name:String,
	order:[
		{
			item_id:mongoose.Schema.Types.ObjectId,
			count:Number
		}
	]
});

module.exports = mongoose.model("table",schema);