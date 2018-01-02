var express = require("express");

var app = express();

app.get("/", function(req, res){
    res.send('Hi there!');
})


app.get("/bye", function(req, res){
    res.send('Goodbye!!!');
})


app.get("/dog", function(req, res){
    res.send('Meow!');
})

app.get("/r/:sub", function(req,res){
    res.send("You are in a sub");
})

app.get("/r/:sub/comments/:id", function(req,res){
    console.log(req.params);
    res.send("You are in a sub " + req.params.sub + " comments " + req.params.id + " id");
})


// it should be all last, the order of routes MATTER
app.get("*", function(req, res){
    res.redirect('/');
})

port = 3000
app.listen(3000, function(){
    console.log("Server started at " + port + " port");
});