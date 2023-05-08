require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");



const exp = require("./routes/experiment");
const authentication = require("./routes/authentication");
const home = require("./routes/home");
const owner = require("./routes/owner");
const waiter = require("./routes/waiter");
const chef = require("./routes/chef");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/exp",exp);

app.use("/api",home);
app.use("/api/authentication",authentication);
app.use("/api/owner",owner);
app.use("/api/waiter",waiter);
app.use("/api/chef",chef);
app.use("/api/images",express.static("/Users/r.p.raiyani/Desktop/Hotel Tracker/images"));




module.exports = app;