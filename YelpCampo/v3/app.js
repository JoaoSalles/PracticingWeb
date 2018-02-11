var express = require("express"),
    request = require("request"),
    bodyParser = require("body-parser");
    mongoose = require("mongoose"),
    seedDB = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp", 
    {useMongoClient: true}
);

seedDB()



// Campground model

var Campground = require("./models/campground");



var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");


app.get("/", function(req, res) {
    res.render("landing");
})

app.get("/campgrounds", function(req, res) {
    // get all campgs
    Campground.find({}, function(err, Allcampgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: Allcampgrounds});
        }
    }
    )
    // res.render("campgrounds", {campgrounds: campgrounds});
})




app.post("/campgrounds", function(req, res) {
    // get data from form and redirect /
    var data = req.body;
    var newCamp =  {name: data.name, image: data.image, description: data.description};
    // Create new campground and save on database
    Campground.create(newCamp, function(err, Allcampgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: Allcampgrounds});
        }
    })
})

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})


// show info about that campground
app.get("/campgrounds/:id/", function(req, res) {
    console.log("entrou");
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    })
})

app.listen(3000, function() {
    console.log("Yelp server starting");
});