var mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/cats_app", {useMongoClient: true})

// it still can be add new fields, but it is way to prevent the lack - Pattern
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

// the name is the single name of the object the s is add after
var Cat = mongoose.model("Cat", catSchema)
// add cat

// var george = new Cat({
//     name: "Georger",
//     age: 11,
//     temperament: "Grouchy"
// });

// george.save(function(err, cat){
//     if (err){
//         console.log("Something went wrong");
//     } else {
//         console.log("We just saved a cat in the database");
//         console.log(cat);
//     }
// });


// create

// Cat.create({
//     name: "Snow White",
//     age: 3,
//     temperament: "Bland"
// }, function(err, cat) {
//     if (err){
//         console.log("Error in creation");
//         console.log(err);
//     } else {
//         console.log("Create");
//         console.log(cats);
//     }
// });

// retrieve all cats

Cat.find({}, function(err, cats) {
    if (err){
        console.log("Error in find");
        console.log(err);
    } else {
        console.log("All the Cats...");
        console.log(cats);
    } 
})

