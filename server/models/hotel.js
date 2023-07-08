const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, "pleas provide the Hotel Name"]
	},
	email: {
		type: String,
		require: [true, "pleas provide the Email"]
	},
	password: {
		type: String,
		require: [true, "pleas provide the Passwrod"],
	},
	ownerPassword:{
		type:String,
		require:[true,"pleas provide the Owner's Password"]
	}
})

schema.pre("save", async function(next){
	if (!this.isModified("password")) {
		return next();
	}else{
		this.password = await bcrypt.hash(this.password, 7);
	}
	if(!this.isModified("ownerPassword")){
		return next()
	}else{
		this.ownerPassword = await bcrypt.hash(this.ownerPassword, 7);
	}

})



module.exports = mongoose.model("hotel", schema);