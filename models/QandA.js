var mongoose = require('mongoose');

var answerSchema = mongoose.Schema({
    userID: String,
    topicID: String,
    userName: String,
    answer: String
});

var QandASchema = mongoose.Schema({
    userID: String,
    userName: String,
    question: String,
    answers: [answerSchema]
});

var QandASchema = mongoose.model('QandA', QandASchema);
module.exports = QandA;
