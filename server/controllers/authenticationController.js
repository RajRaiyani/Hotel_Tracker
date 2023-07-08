
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Models ----
const Hotel = require("../models/hotel");

// utilities -----
const validator = require("./../utility/validation/validator");


//======================= Sign in =============================

exports.SignIn = async (req, res) => {
	var { name, email, password, cpassword, ownerPassword, cownerPassword } = req.body;

	if (!(name && email && password && cpassword && ownerPassword && cownerPassword))
		return res.json({ status: "MISSING_FIELD", message: "All fields are required" });
	if (password !== cpassword || ownerPassword !== cownerPassword)
		return res.json({ status: "OTHER", message: "confirm password should match" });
	if (!validator.validate("hotelName", name))
		return res.json({ status: "INVALID", message: "Hotel Name is not in valid formate.", description: validator.info("hotelName") });
	if (!validator.validate("email", email))
		return res.json({ status: "INVALID", message: "email is not a vlid email address.", description: validator.info("email") });


	try {

		var exist = await Hotel.findOne({ email });

		if (exist)
			return res.send({ status: "EXIST", message: "Hotel alrady exist" });

		var data = await Hotel.create({ name, email, password, ownerPassword });

		res.send({ status: "OK", data });
	} catch (error) {
		res.json({ status: "X", message: "something went wrong while SignIn Hotel.", error });
	}
}

//======================= Log in ============================

exports.LogIn = async (req, res) => {

	var { email, password } = req.body;
	if (!(email && password)) {
		return res.json({ status: "MISSING_FIELD", message: "all fields are required." });
	}
	try {
		var data = await Hotel.findOne({ email });

		if (!data)
			return res.json({ status: "NOT_EXIST", message: "Hotel does not exist" });

		if (!bcrypt.compare(password, data.password))
			return res.json({ status: "INVALID_PW", message: "envalid password" });

		var token = jwt.sign({ hotel_id: data._id, email }, process.env.TOKEN_KEY, { expiresIn: "5h" });

		res.json({ status: "OK", token });


	} catch (error) {
		res.json({ status: "X", message: "something went wrong while LogIn Hotel.", error });
	}


}

//========================= Owner LogIn =======================================

exports.OwnerLogIn = async (req, res) => {

	var { ownerPassword } = req.body;

	if (!ownerPassword)
		return res.json({ status: "MISSING_FIELD", message: "all fields are required." })

	try {
		var data = await Hotel.findOne({ _id: req.hotel_id });

		if (!bcrypt.compare(ownerPassword, data.ownerPassword))
			return res.json({ status: "INVALID_PW", message: "Invalid password" });

		var ownerToken = jwt.sign({ hotel_id: data._id, email: data.email }, process.env.OWNER_TOKEN_KEY, { expiresIn: "2h" });
		res.json({ status: "OK", ownerToken });

	} catch (error) {
		res.json({ status: "X", message: "something went wront while LogIn owner.", error });
	}



}