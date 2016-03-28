var mongoose = require('mongoose');

var discussionSchema = mongoose.Schema({
    user: String,
    discussion: String
});

var Discussion = mongoose.model('Discussion', discussionSchema);
module.exports = Discussion;