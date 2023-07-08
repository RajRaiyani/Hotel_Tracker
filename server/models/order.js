const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	
	hotel_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"hotel"
	},

	item_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"item"
	},

	table_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"table"
	},
	
	quantity:Number,
});

module.exports = mongoose.model("order",schema);