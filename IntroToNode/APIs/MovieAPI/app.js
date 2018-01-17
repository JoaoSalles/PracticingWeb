var express = require("express");
var request = require("request");
var app = express();
app.set("view engine", "ejs");


app.get("/", function(req,res) {
   res.render("search") 
});

app.get("/results", function(req,res){
    var search = req.query.title;
    url = "http://omdbapi.com/?s=" + search + "&apikey=thewdb";
    request(url, function (error, response, body)  {
        if (!error && response.statusCode == 200){
            var parsedData = JSON.parse(body);
            // res.send(parsedData['Search'][0]);
            res.render("results", {data: parsedData});
        }
    });
});



app.listen(3000, function() {
    console.log("Movie App started");  
})

