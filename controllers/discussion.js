var Discussion = require('./../models/discussion');
var QandA = require('./../models/QandA');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');


function createDiscussion(req, res){
    var sess = session;

    var discussion = new Discussion({
        topic: req.body.newDiscussion,
        userID: sess.userID,
        userName: sess.userName
    });
    discussion.save(function (err, discussion) {
    if (err) return console.error(err);
    console.log('succes! new discussion topic ' + discussion.topic);
    });

    getAllDiscussions(req, res);
};
module.exports.createDiscussion = createDiscussion;


function getAllDiscussions(req, res){
    Discussion.find(function(err, discussions){
        if (err) return console.error(err);
        //console.log('discussions');
        return res.render('discussion/all', {
            date: new Date().toDateString(),
            allDiscussions: discussions
          });
    });
};
module.exports.getAllDiscussions = getAllDiscussions;


function getDiscussion(req, res, pID, callback){
    var jsonDiscussion = {};
    Discussion.findOne({'_id': pID}, 'userName topic _id', function (err, discussion) {
        if (err) return handleError(err);
        jsonDiscussion.discussion = discussion;
        console.log('user %s maakte de topic -> %s aan. ID = %s', discussion.userName, discussion.topic, discussion._id);

        QandA.find(function(err, qandas){
            if (err) return console.error(err);
            console.log('getDiscussion qandas : ' + qandas);
            jsonDiscussion.qandas = qandas;
            res.render('discussion/QandA', {
                topic: jsonDiscussion.discussion.topic,
                allQandAs: jsonDiscussion.qandas
            });
        });
    });

};
module.exports.getDiscussion = getDiscussion;


function getAllQandAs(res, req, callback) {
    QandA.find(function(err, qandas){
        if (err) return console.error(err);
        callback(qandas);
    });
}
module.exports.getAllQandAs = getAllQandAs;


function addQuestion(req, res){
    var sess = session;

    var qanda = new QandA({
        topicID: req.params.id,
        userID: sess.userID,
        userName: sess.userName,
        question: req.body.newQuestion
    });

    qanda.save(function (err, qanda) {
    if (err) return console.error(err);
    console.log('succes! new question ' + qanda.question + 'for topic ');
    });

    //getAllQandAs(req, res, callback);
};
module.exports.addQuestion = addQuestion;
