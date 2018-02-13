var express = require("express"),
    request = require("request"),
    bodyParser = require("body-parser");
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    seedDB = require("./seeds");



// Import routes
var commentsRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");


mongoose.connect("mongodb://localhost/yelp_camp", 
    {useMongoClient: true}
);

// seedDB();



// Campground model

var Campground = require("./models/campground");
// Comments model
var Comment = require("./models/comment");
// User model
var User = require("./models/user");



var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
// to use ours css
app.use(express.static(__dirname+"/public"))
app.use(methodOverride("_method"))




// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Oh no, my secret is been exposed!!!!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// prevent us to add currentUser: req.user 
// in every render
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})


// The order of use MATTER, put is in the end
app.use("/campgrounds/:id/comments", commentsRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(indexRoutes);

app.listen(3000, function() {
    console.log("Yelp server starting");
});