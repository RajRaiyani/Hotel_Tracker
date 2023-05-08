const app = require("./main");


app.listen(process.env.server_port,()=>{
	console.log("server is runing on port : "+process.env.server_port);
})