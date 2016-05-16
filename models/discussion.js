var mongoose = require('mongoose');

var discussionSchema = mongoose.Schema({
    userID: String,
    userName: String,
    topic: String,
    lat: String,
    lng: String,
    active: Boolean
});

var Discussion = mongoose.model('Discussion', discussionSchema);
module.exports = Discussion;
