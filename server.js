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
  var topic_web = "<html><head><link rel=\"stylesheet\" href=\"http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css\"><script src=\"//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js\"></script><script src=\"//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js\"></script></head>" +
    + "<body><div><div><nav class=\"navbar navbar-inverse\" role=\"navigation\" style=\"padding-left:130px;\">" +
    + "<ul class=\"nav navbar-nav\"><li><a href=\"/\">Home</a></li><li class=\"active\"><a href=\"/topics\">Topic List</a></li><li><a href=\"/about\">About us<span class=\"sr-only\">(current)</span></a></li>"+
    + "<!--<li><a href=\"/contact\">Contact us</a></li>--></ul></nav></div>" +
    + "<br/><div class=\"jumbotron\">" +
    + "<p>Topics</p>" +
    + "<div id=\"topic_list\">"
  request(kafkaReqAddress + "topics", function(error, response, body) {
  console.log(body);
  topic_web += body;
  // auxModule.paintTopics(body);
  });
  topic_web += "</div></div></div></body></html>"
  res.send(topic_web);
  // res.sendFile(path + "topics.html");
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
