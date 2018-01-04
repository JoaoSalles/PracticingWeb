var express = require("express");

var app = express();

// to get static from public and get css
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res) {
    res.render("home");
})

app.get("/fallinlovewith/:puppy",function(req,res) {
    var puppy = req.params.puppy;
    res.render("love", {puppy : puppy});
})


app.get("/posts",function(req,res) {
    var posts = [
        {title : "Post 1", author : "Susy"},
        {title : "My adorable pet bunny", author : "Charlie"},
        {title : "Can you believe this pomsky", author : "Colt"},
    ]
    res.render("posts", {posts: posts})
})

app.listen(3000, function() {
    console.log("Server started");  
})