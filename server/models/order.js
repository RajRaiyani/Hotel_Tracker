const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	user_id:mongoose.Schema.Types.ObjectId,
	list:[
		{
			tableName:String,
			itemNumber:Number,
			itemName:String,
			quantity:Number,
		}
	]
});

module.exports = mongoose.model("order",schema);