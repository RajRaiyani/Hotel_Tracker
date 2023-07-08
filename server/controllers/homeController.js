
const Hotel = require("../models/hotel");
const item = require("../models/item");
const table = require("../models/table");


exports.home = async (req, res) => {
	var data = await Hotel.findOne({ _id: req.hotel_id },{name:1});
	res.json({ status: "OK", data });
}

exports.getAllTables = async (req,res)=>{
	var data = await table.find({user_id:req.user_id});
	res.json({status:"OK",data:data});
}

exports.getItems = async (req,res)=>{
	var data = await item.find({user_id:req.user_id});
	res.json({status:"OK",data:data});
}

exports.getOrder = async (req,res)=>{
	var items = await item.find({user_id:req.user_id});
	var mytable = await table.findOne({_id:req.params.id})
	var order = mytable.order;
	var orderList = []
	order.forEach(e=>{
		for(let i = 0;i<items.length;i++){
			if(e.item_id.equals(items[i]._id)){
				var temp = items[i];
				orderList.push({_id:temp._id,name:temp.name,number:temp.number,price:temp.price,count:e.count});
				break
			}
		}
	})

	res.json({status:"ok",data:orderList,tableName:mytable.name});
}