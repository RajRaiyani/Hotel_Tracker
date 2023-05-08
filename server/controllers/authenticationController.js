const hotel = require("../models/hotel");
const order = require("../models/order");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//======================= Sign in =============================

exports.SignIn = async (req,res)=>{

	try{
		var {hotelName,email,password,cpassword,ownerPassword,cownerPassword} = req.body;
		if(!(hotelName && email && password && cpassword && ownerPassword && cownerPassword)){
			res.json({status:"all required",message:"All fileds are required"});
			return;
		}
		if(password !== cpassword || ownerPassword !== cownerPassword){
			res.json({status:"not match",message:"confirm password should match"});
			return;
		}
		var exist = await hotel.findOne({email});
		if(exist){
			res.send({status:"exist",message:"alrady exist"});
			return;
		}
	
		var data = await hotel.create({
			hotelName,email,password,ownerPassword
		})
		await order.create({user_id:data._id});
		res.send({
			status:"ok",
			data
		});
	}catch(e){
		console.log(e);
		res.json(e);
	}
}

//======================= Log in ============================

exports.LogIn = async (req,res)=>{

	var {email,password} = req.body;
	if(!(email && password)){
		return res.json({status:"all required",message:"all fileds are required"});
	}
	var data = await hotel.findOne({email});
	if(!data){
		return res.json({status:"not exist",message:"User does not exist"});
	}
	if(await bcrypt.compare(password,data.password)){

		var token = jwt.sign({user_id:data._id,email},process.env.token_key,{expiresIn:"5h"});
		res.json({
			status:"ok",
			token
		});

	}else{
		res.json({message:"envalid password"});
	}
}

//==========================================================================

exports.OwnerLogIn = async (req,res)=>{
	
	var {ownerPassword} = req.body;
	if(!ownerPassword){
		return res.json({status:"required",message:"password required"})
	}
	
	var data = await hotel.findOne({_id:req.user_id});

	if(await bcrypt.compare(ownerPassword,data.ownerPassword)){
		var ownerToken = jwt.sign({user_id:data._id,email:data.email},process.env.owner_token_key,{expiresIn:"2h"});
		res.json({status:"ok",ownerToken});
	}else{
		res.json({status:"invalid",message:"Invalid password"});
	}
}