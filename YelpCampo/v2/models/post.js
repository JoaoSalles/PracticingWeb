
var mongoose = require("mongoose");

var campgroundsSchema = new mongoose.Schema ({
    name: String,
    content: String,
    description: String,
})

module.exports = mongoose.model("Campground", campgroundsSchema);