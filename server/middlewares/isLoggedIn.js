const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {

	var token = req.headers.token || req.body.token;
	if (!token) {
		return res.json({ status: "missing" });
	}
	
	try {
		var payLoad = jwt.verify(token, process.env.token_key);
		req.user_id = payLoad.user_id;
		next();
	} catch (e) {
		res.json({ status: "expired" });
		return;
	}


}

module.exports = isLoggedIn;