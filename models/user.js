var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    user: String,
    password: String,
    profileImgUrl: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;
