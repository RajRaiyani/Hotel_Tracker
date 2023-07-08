const hotel = require("../models/hotel");
const item = require("../models/item");
const table = require("../models/table");

exports.owner = async (req,res)=>{
	var data = await hotel.findOne({_id:req.user_id},{hotelName:1})
	res.json({status:"ok",data});
}



exports.addTable = async (req,res)=>{

	try{
		var data = await table.create({hotel_id:req.hotel_id,name:req.body.tableName});
	}catch(error){
		return res.json({status:"X",message:"something went wrong while adding table"});
	}
	
	res.json({status:"OK",data:data});
}

exports.addItem = async (req,res)=>{
	var data = await item.create({user_id:req.user_id,name:req.body.name,number:req.body.number,price:req.body.price});
	res.json({status:"OK",data:data});
}


