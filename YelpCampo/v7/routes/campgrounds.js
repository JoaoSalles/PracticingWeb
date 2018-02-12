var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/", function(req, res) {
    // get all camps
    Campground.find({}, function(err, Allcampgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: Allcampgrounds});
        }
    }
    )
})



router.post("/", function(req, res) {
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


router.get("/new", function(req, res) {
    res.render("campgrounds/new");
})


// show info about that campground
router.get("/:id/", function(req, res) {

    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
})

function isLoggedIn(req, res, next){
    if ( req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;

