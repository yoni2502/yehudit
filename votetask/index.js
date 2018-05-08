var Emitter = require('events');
var eventsConfig = require('./config').functions;
var myEmtr = new Emitter();
var message = require('./config').messages;
var summSurvey = require('./config').summerySurvey;
var main = require('./mainVote');



var http = require("http");
http.createServer(function (req, res) {

var invoke1 = main(['house committee','apartment1','apartment2','apartment3']);
var invoke2 = main(['Color','blue','red','pink']);


res.write(message.toString());

console.log(" S U M M E R Y :");
console.log(summSurvey.toString());
res.write(" S U M M E R Y :");
res.write(summSurvey.toString());

  res.end();
}).listen(8080);   
console.log("listening on port 8080");





