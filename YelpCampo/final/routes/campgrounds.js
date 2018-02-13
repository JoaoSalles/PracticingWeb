var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js")

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



router.post("/", middleware.isLoggedIn, function(req, res) {
    // get data from form and redirect /
    var data = req.body;
    var author ={
        id: req.user._id,
        username: req.user.username
    }
    var newCamp =  {name: data.name, price: data.price, image: data.image, description: data.description, author:author};
    // Create new campground and save on database
    Campground.create(newCamp, function(err, newlyCreated){
        if (err){
            console.log(err);
        } else {
            req.flash("success", "Campground created!");
            res.redirect("/campgrounds")
        }
    })
})


router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
})


// Update campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, foundCampground) {
        if(err){
            res.redirect("/campgrounds")
        } else{
            req.flash("success", "Campground edited!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
})



// Edit camground
router.get("/:id/edit", middleware.checkCampgroundOwnership , function(req, res) {

        Campground.findById(req.params.id, function(err, foundCampground) {
            if(err){
                res.redirect("/campgrounds")
            } else{
                res.render("campgrounds/edit", {campground: foundCampground});
            }
        });
})


// Destroy campground 

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err){
            res.redirect("/campgrounds");
        }
        req.flash("success", "Campground deleted!");
        res.redirect("/campgrounds");
    })
});



// show info about that campground
router.get("/:id/", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err || !foundCampground){
            req.flash("success", "Campground not found!!");
            res.redirect('/campgrounds');
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
})

module.exports = router;

