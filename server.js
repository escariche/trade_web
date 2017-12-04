const express = require("express");
const request = require("request");
const jquery = require("jquery");
const app = express();
const router = express.Router();
const path = __dirname + '/views/';

// import * as auxModule from 'aux_functions.js';

const kafkaReqAddress = 'http://ec2-13-59-190-223.us-east-2.compute.amazonaws.com:3000/'

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/topics",function(req,res){
  // request(kafkaReqAddress + "topics", function(error, response, body) {
  // console.log(body);
  // });
  res.sendFile(path + "topics.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

// router.get("/contact",function(req,res){
//   res.sendFile(path + "contact.html");
// });


app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});

this.setRequestHeader( 'Access-Control-Allow-Origin', kafkaReqAddress);
