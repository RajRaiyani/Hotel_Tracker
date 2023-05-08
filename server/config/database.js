const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

exports.connect = ()=>{
	mongoose.connect(process.env.connection_string).then(()=>{
		console.log("database hase been connected.");
	}).catch(()=>{
		console.log("database connection failed.")
	})
}
