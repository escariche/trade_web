const qs = require('querystring');

export function paintTopics(var topicsJson){
  document.getElementById('jumbotron').innerHTML = qs.stringify(topicsJson, "</p>", " >> ");
}
