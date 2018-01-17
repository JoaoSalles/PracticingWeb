var express = require("express"),
app         = express(),
expressSanitizer = require("express-sanitizer"),
mongoose    = require("mongoose"),
bodyParser  = require("body-parser"),
// overtide http methods to enable forms with put and delete
methodOverride = require("method-override");  

// app config
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
// expressSanitizer needs to be after bodyParser
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// title
// image
// body
// created

mongoose.connect("mongodb://localhost/restful_blog_app", 
    {useMongoClient: true}
);

// mongoose/model config
var blogSchema =  new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Blog test",
//     image: "http://www.photosforclass.com/download/2596196908",
//     body: "Hello this is a blog post"
// }, function(err, blog){
//     if (err){
//         console.log(err);
//     }
// })




// new route


app.get("/blogs/new", function(req,res) {
    console.log('aqui');
    res.render("new");
});



// edit route

app.get('/blogs/:id/edit',function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err) {
            res.redirect('/blogs');
        } else {
            res.render('edit', {blog : foundBlog});
        }
    });
});

// update route

app.put('/blogs/:id',function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlogs){
        if(err) {
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/'+ req.params.id);
        }
    });
});

// create route

app.post('/blogs',function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlogs){
        if(err) {
            console.log("Error");
            res.redirect('/blogs/new');
        } else {
            res.redirect('/blogs');
        }
    });
});


// show route
app.get("/blogs/:id", function (req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    })
});

// destroy route

app.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err, removeBlogs){
        if(err) {
            console.log("Error");
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs');
        }
    });
});


// restful routes

app.get("/blogs", function(req,res) {
    Blog.find({}, function(err, blogs){
        if (err) {
            console.log("Error!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});


app.get("/", function(req,res) {
    console.log("lal1");
    res.redirect("/blogs");
})

app.get("*", function(req,res) {
    console.log("lal");
    res.redirect("/blogs");
})

app.listen(3000, function() {
    console.log("Blog server starting");
});