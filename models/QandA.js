var mongoose = require('mongoose');

var QandASchema = mongoose.Schema({
    topicID: String,
    userID: String,
    userName: String,
    question: String,
    answers: [{
        userID: String,
        userName: String,
        answer: String
    }],
    activeUsers: [{
        userID: String
    }],
    active: Boolean
});

var QandA = mongoose.model('QandA', QandASchema);
module.exports = QandA;
