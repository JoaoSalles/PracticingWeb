var express = require("express"),
    request = require("request"),
    bodyParser = require("body-parser");
    mongoose = require("mongoose");


    mongoose.connect("mongodb://localhost/yelp_camp", 
        {useMongoClient: true}
    );

// Schema Setup

var campgroundsSchema = new mongoose.Schema ({
    name: String,
    image: String,
    description: String,
})

var campground = mongoose.model("Campground", campgroundsSchema);

// campground.create(
//     {
//         name: "Mountain Goat's Rest",
//         image: "http://www.photosforclass.com/download/6090714876",
//         description: "Nothing special"},
//     function(err, campground){
//         if (err){
//             console.log(err);
//             console.log("Something went wrong 2");
//         } else {
//             console.log("Camground saved.");
//             console.log(campground);
//         }
//     }
// )


var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");


app.get("/", function(req, res) {
    res.render("landing");
})

app.get("/campgrounds", function(req, res) {
    // get all campgs
    campground.find({}, function(err, Allcampgrounds){
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
    campground.create(newCamp, function(err, Allcampgrounds){
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
    campground.findById(req.params.id, function(err, foundCampground){
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