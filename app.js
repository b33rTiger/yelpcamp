var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
	{name: "Salmon Creek", image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
	{name: "Granite Hill", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
	{name: "Nevada Beach", image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"}
]

app.get("/", function(req, res){
	res.render("index");
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
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

app.get("/campgrounds/new", function(req, res){
	res.render("new");
});

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.listen(3000, function(){
	console.log("listening on port 3000");
});