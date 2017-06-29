var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("index");
});

app.get("/results", function(req, res){
	var query = req.query.search;
	var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("results", {data: data});
		};
	});
});

app.listen(3000, function(){
	console.log("listening on port 3000");
});