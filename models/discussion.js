var mongoose = require('mongoose');

var discussionSchema = mongoose.Schema({
    userID: String,
    userName: String,
    topic: String
});

var Discussion = mongoose.model('Discussion', discussionSchema);
module.exports = Discussion;
