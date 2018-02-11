var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
mongoose.Promise = require('bluebird');
var data = [
    {
        name: "Cloud's Rest",
        image: "http://www.photosforclass.com/download/7626464792",
        description: "la la la"
    },
    {
        name: "Grass's Rest",
        image: "http://www.photosforclass.com/download/5641024448",
        description: "la ka la"
    },
    {
        name: "Florest's Rest",
        image: "http://www.photosforclass.com/download/882244782",
        description: "la la ka"
    }
]

function seedBD(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        Comment.remove({}, function(err){ 
            console.log("removed campgrounds!");
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("add campground!");
                        // create a comment
                        Comment.create({text: "This place is great, but I wish there was internet",
                        author: "Salles"}, function(err, comment) {
                        if (err) {
                            console.log("Erro");
                        } else {
                                // async problem
                                campground.comments.push(comment._id);
                                // campground.comments.push(comment);
                                // campground.comments = [comment._id];
                                // console.log(campground);
                                // Campground.findOneAndUpdate(campground._id,campground)
                                campground.save()
                                console.log("Comment created");
                        } 
                        });
                    }
                });
            });
        });
    });
}



module.exports = seedBD;