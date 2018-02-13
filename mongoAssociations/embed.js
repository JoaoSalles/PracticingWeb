var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// mongo does not support promise anymore it is necessary to declare node as global
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blog_demo", 
    {useMongoClient: true}
);


// Post - title, content
var postSchema = new Schema({
    title: String,
    content: String
});

// User - email, name
var userSchema = new Schema({
    email: String,
    name: String,
    posts: [postSchema]},
    // related to one to many relations
    { usePushEach: true }
);

var User = mongoose.model('User',userSchema);



var postModel = mongoose.model('Post',postSchema);

// CREATE USER

// var newUser = new User({
//     email: "many@brown.edu",
//     name: "Manuel Brown"
// });

// newUser.posts.push({
//     tittle: "Picking lettuce",
//     content: "Very carefully"
// })

// newUser.save().then( function(createUser) {
//     console.log(createUser);
// }).catch(function(err){
//     console.log("Error!");
// })

// CREATE POST

// var newPost = new postModel({
//     title: "Reflections on Apples",
//     content: "They are delicious"
// });

// newPost.save().then( function(createPost) {
//     console.log(createPost);
// }).catch(function(err){
//     console.log("Error!");
// })

// find user

User.findOne({name: 'MAnuel Brown'} ,  function(err, user){
    if (err) {
        console.log("Error!");
    } else {
        // user.posts.push({
        //     title: "Do not pick!",
        //     content: "Tomatoes!!!"
        // });
        // user.save().then( function(user) {
        //     console.log(user);
        // }); 
        console.log(user);
    }
});



