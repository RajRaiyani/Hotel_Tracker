const order = require("./../models/order");

exports.GetAllOrder = async (req, res) => {
	var data = (await order.findOne({ user_id: req.user_id })).list;
	res.json({ status: "ok", data });
}

exports.OrderComplete = async (req, res) => {

	await order.updateOne({user_id:req.user_id},{$pull:{list:{_id:req.body.orderId}}});
	var list = (await order.findOne({user_id:req.user_id})).list;

	res.json({status:"ok",data:list});
}