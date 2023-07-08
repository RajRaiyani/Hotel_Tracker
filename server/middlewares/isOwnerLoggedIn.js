const jwt = require("jsonwebtoken");

const isOwnerLoggedIn = (req,res,next)=>{
	
	var ownerToken = req.headers.token || req.body.token;
	if(!ownerToken){
		return res.json({status:"missing"});
	}

	try{
		var payLoad = jwt.verify(ownerToken,process.env.OWNER_TOKEN_KEY);
		req.user_id=payLoad.user_id;
		next();
	}catch (e){
		return res.json({status:"expired"});
	}
	
}
module.exports = isOwnerLoggedIn;