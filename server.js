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
  var requestedPage = "topics"
  request(kafkaReqAddress + requestedPage, function(error, response, body){
  console.log(body);
  toHtmlFile(requestedPage, body)
  });
  res.sendFile(path + "topics.html");
  console.log("Just ran sendFile in server.js");
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

// $("#btn-save").click();
// var text = $("#textarea").val();
function toHtmlFile(filename, content){
  var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
  saveAs(blob, path + filename + ".html");
}


var MenuExample = React.createClass({

    getInitialState: function(){
        return { focused: 0 };
    },

    clicked: function(index){

        // The click handler will update the state with
        // the index of the focused menu entry

        this.setState({focused: index});
    },

    render: function() {

        // Here we will read the items property, which was passed
        // as an attribute when the component was created

        var self = this;

        // The map method will loop over the array of menu entries,
        // and will return a new array with <li> elements.

        return (
            <div>
                <ul>{ this.props.items.map(function(m, index){

                    var style = '';

                    if(self.state.focused == index){
                        style = 'focused';
                    }

                    // Notice the use of the bind() method. It makes the
                    // index available to the clicked function:

                    return <li className={style} onClick={self.clicked.bind(self, index)}>{m}</li>;

                }) }

                </ul>

                <p>Selected: {this.props.items[this.state.focused]}</p>
            </div>
        );

    }
});

// Render the menu component on the page, and pass an array with menu options

ReactDOM.render(
    <MenuExample items={ ['Home', 'Services', 'About', 'Contact us'] } />,
    document.getElementById('container')
);
