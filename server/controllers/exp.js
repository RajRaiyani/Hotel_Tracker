exports.exp = (req,res)=>{
	console.log(req.body);
	res.json({status:"this from exp controller"});
}

exports.params = (req,res)=>{
	res.send(req.params.value);
}

exports.hey = (req,res)=>{
	res.send("this is hey route");
}