var express = require('express');

var app = express();

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assigment");
});


// app.get("/speak/:animal", function(req, res){
//     if (req.params.animal == "pig"){
//         res.send("The pig says 'Kill me, I am in great pain!'");
//     }else if(req.params.animal == "cow"){
//         res.send("The cow says 'I will deal with you after finish with the pig'");
//     }else if(req.params.animal == "dog"){
//         res.send("The dog says: 'woof woof'");
//     }else{
//         res.redirect("/");
//     }
// });

app.get("/speak/:animal", function(req, res){
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof",
        cat: "I hate you"
    }
    var animal = req.params.animal.toLowerCase();
    var sounds = sounds[animal]
    res.send("The " + animal + " says '" + sounds + "'");
});

app.get("/repeat/:say/:num", function(req, res){
    words = "";
    for (let i = 0; i < req.params.num; i++) {
        words += req.params.say + " ";
    }
    res.send(words);
});


// it should be all last, the order of routes MATTER
app.get("*", function(req, res){
    res.send('Sorry, page not found...');
})


port = 3000
app.listen(3000, function(){
    console.log("Server started at " + port + " port");
});



