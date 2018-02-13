var express = require("express");
// mergeParams ables us to get params value in the get
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
// when the file name is index, it is called bt default
var middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
    if (err) {
        console.log(err);
    } else {
        res.render("comments/new", {campground: campground});
    }        
    })
})

router.post("/", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
           Comment.create(req.body.comment, function(err, comment){
            if (err) {
                console.log(err);
            } else {
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save()
                campground.comments.push(comment);
                campground.save();
                req.flash("success", "Comment created!");
                res.redirect("/campgrounds/" + campground._id);
            }
           });
        }    
    })
});


// edit comments
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "No campground found")
            return res.redirect("back");
        } else {
            Comment.findById(req.params.comment_id, function(err, foundComment) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("comments/edit", { campground_id: req.params.id, comment: foundComment});
                }        
            })
        }
    })
})

// update comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, {text: req.body.comment['text']} ,function(err, updateComment) {
    if (err || !updateComment) {
        res.flash("error", "Comment not found!");
        res.redirect("back");
    } else {
        req.flash("success", "Comment updated!");
        res.redirect("/campgrounds/" + req.params.id);
    }        
    })
})


// Destroy route

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    console.log("entrou");
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err){
            res.redirect("back");
        }
        req.flash("success", "Comment Deleted!");
        res.redirect("/campgrounds/" + req.params.id);
    })
});


module.exports = router;
