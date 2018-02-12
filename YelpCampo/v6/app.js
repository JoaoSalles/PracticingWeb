var express = require("express"),
    request = require("request"),
    bodyParser = require("body-parser");
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    seedDB = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp", 
    {useMongoClient: true}
);

seedDB()



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

// prevent us to add currentUser: req.user 
// in every render
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})


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

// ===================================
// ROUTES


app.get("/", function(req, res) {
    res.render("landing");
})


// Camgrounds Routes

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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
    if (err) {
        console.log(err);
    } else {
        res.render("comments/new", {campground: campground});
    }        
    })
})

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
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



//  ========================
// Auth Routes

app.get("/register/", function(req, res) {
    res.render("register");
})

app.post("/register/", function(req, res) {
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err)
            return res.redirect("/register")
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds");
        });
        
    });
})


app.get("/login/", function(req, res) {
    res.render("login");
})

app.post("/login/", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {

})


app.get("/logout/", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
})


function isLoggedIn(req, res, next){
    if ( req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}






app.listen(3000, function() {
    console.log("Yelp server starting");
});