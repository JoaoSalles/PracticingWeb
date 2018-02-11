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
// Comments model

var Comment = require("./models/comment");



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
            res.render("campgrounds/index", {campgrounds: Allcampgrounds});
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
    res.render("campgrounds/new");
})


// comments
app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
    if (err) {
        console.log(err);
    } else {
        res.render("comments/new", {campground: campground});
    }        
    })
})

app.post("/campgrounds/:id/comments", function(req, res) {
    console.log("entrou");
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
           Comment.create(req.body.comment, function(err, comment){
            if (err) {
                console.log(err);
            } else {
                campground.comments.push(comment);
                campground.save();
                res.redirect("/campgrounds/" + campground._id);
            }
           });
        }   1     
    })
});


// show info about that campground
app.get("/campgrounds/:id/", function(req, res) {

    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
})

app.listen(3000, function() {
    console.log("Yelp server starting");
});