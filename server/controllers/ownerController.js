const hotel = require("../models/hotel");
const item = require("../models/item");
const table = require("../models/table");

exports.owner = async (req,res)=>{
	var data = await hotel.findOne({_id:req.user_id},{hotelName:1})
	res.json({status:"ok",data});
}



exports.addTable = async (req,res)=>{
	await table.create({user_id:req.user_id,name:req.body.tableName});
	var data = await table.find({user_id:req.user_id});
	res.json({status:"ok",data:data});
}

exports.addItem = async (req,res)=>{
	await item.create({user_id:req.user_id,name:req.body.name,number:req.body.number,price:req.body.price});
	var data = await item.find({user_id:req.user_id});
	res.json({status:"ok",data:data});
}


