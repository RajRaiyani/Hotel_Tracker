require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const exp = require("./routes/experiment");
const authentication = require("./routes/authentication");
const home = require("./routes/home");
const owner = require("./routes/owner");
const waiter = require("./routes/waiter");
const chef = require("./routes/chef");




app.use("/api/v1/exp",exp);
app.use("/api/v1/home",home);
app.use("/api/v1/authentication",authentication);
app.use("/api/v1/owner",owner);
app.use("/api/v1/waiter",waiter);
app.use("/api/v1/chef",chef);
app.use("/api/v1/images",express.static("/Users/r.p.raiyani/Desktop/Hotel Tracker/images"));




module.exports = app;