var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");


var campgrounds = [
    {name: "Salmon Cree", image: "http://www.photosforclass.com/download/316612923"},
    {name: "Mountain Goat's Rest", image: "http://www.photosforclass.com/download/6090714876"},
    {name: "Salmon Cree", image: "http://www.photosforclass.com/download/321487195"},
    {name: "Granine Hill", image: "http://www.photosforclass.com/download/316612921"},
    {name: "Mountain Goat's Rest", image: "http://www.photosforclass.com/download/6090714876"},
    {name: "Salmon Cree", image: "http://www.photosforclass.com/download/321487195"},
    {name: "Granine Hill", image: "http://www.photosforclass.com/download/316612921"},
    {name: "Salmon Cree", image: "http://www.photosforclass.com/download/316612923"},
    {name: "Mountain Goat's Rest", image: "http://www.photosforclass.com/download/6090714876"},
    {name: "Salmon Cree", image: "http://www.photosforclass.com/download/321487195"},
    {name: "Granine Hill", image: "http://www.photosforclass.com/download/316612921"},
    {name: "Salmon Cree", image: "http://www.photosforclass.com/download/316612923"},
    {name: "Mountain Goat's Rest", image: "http://www.photosforclass.com/download/6090714876"},
    {name: "Salmon Cree", image: "http://www.photosforclass.com/download/321487195"},
    {name: "Granine Hill", image: "http://www.photosforclass.com/download/316612921"},
    {name: "Salmon Cree", image: "http://www.photosforclass.com/download/316612923"}
]


app.get("/", function(req, res) {
    res.render("landing");
})

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
})


app.post("/campgrounds", function(req, res) {
    // get data from form and redirect /
    var data = req.body;
    var newCamp =  {name: data.name, image: data.image};
    campgrounds.push(newCamp)
    res.redirect("campgrounds");
})

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})


app.listen(3000, function() {
    console.log("Yelp server starting");
});