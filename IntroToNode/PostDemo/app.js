var express = require("express");
var bodyParser =require("body-parser");

var app = express();

app.set("view engine", "ejs");

var friends = ["Joao","Pedro","Marcos","Aline","Gabriela"]

// parser request to javascript object
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("home");
})

"/friends"
app.get("/friends", function(req,res){
    res.render("friends", {friends: friends})
})

app.post("/addfriend", function(req, res){
    friends.push(req.body.name)
    res.redirect("/friends")
});

app.listen(3000,function(){
    console.log("Server Started");
})
