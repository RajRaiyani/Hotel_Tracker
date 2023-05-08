const table = require("../models/table");
const order = require("../models/order");

exports.table = async (req,res)=>{
	var data = await table.findOne({_id:req.params.id},{name:1});
	res.json({status:"ok",data});
}




exports.placeOrder = async (req,res)=>{
	var data = req.body.data;

	var Table = await table.findOne({_id:req.body.table_id})
	var placedOrder = Table.order;

	data.forEach((element) => {
		var flag = false;
		for(let i = 0;i<placedOrder.length;i++){
			if(placedOrder[i].item_id.equals(element._id)){
				placedOrder[i].count += element.count;
				flag = true;
				break;
			}
		}
		if(!flag){
			placedOrder.push({item_id:element._id,count:element.count});
		}

	});
	await table.updateOne({_id:req.body.table_id},{$set:{order:placedOrder}});
	var orderList = [];
	data.forEach(e=>{
		orderList.push({itemNumber:e.number,itemName:e.name,quantity:e.count,tableName:Table.name});
	})
	await order.updateOne({user_id:req.user_id},{$set:{list:orderList}});
	
	res.json({status:"ok"});
}
