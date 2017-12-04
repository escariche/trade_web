const qs = require('querystring');

function paintTopics(var topicsJson){
  document.getElementById('jumbotron').innerHTML = qs.stringify(topicsJson, "</p>", " >> ");
}
