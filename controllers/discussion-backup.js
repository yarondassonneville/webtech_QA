var Discussion = require('./../models/discussion');
var QandA = require('./../models/QandA');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');


function create(req, res){
    console.log('create fired');
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

    // var qandA = new QandA({
    //     topicID: discussion.id,
    //     userID: sess.userID,
    //     userName: sess.userName
    // });
    // qandA.save(function (err, qandA) {
    // if (err) return console.error(err);
    // console.log('succes! new QandA for topic');
    // });

    getAllDiscussions(req, res);
};

module.exports.create = create;


function getAllDiscussions(req, res){
    var allDiscussions;
    Discussion.find(function(err, discussions){
        if (err) return console.error(err);
        allDiscussions = discussions;
        return res.render('discussion/all', {
            date: new Date().toDateString(),
            allDiscussions: allDiscussions
        });
    });
};

module.exports.getAllDiscussions = getAllDiscussions;


function getDiscussion(req, res, pID, callback){
    var discussionTopic = "";
    Discussion.findOne({'_id': pID}, 'userName topic _id', function (err, discussion) {
        if (err) return handleError(err);
        console.log('user %s maakte de topic -> %s aan. ID = %s', discussion.userName, discussion.topic, discussion._id);
        callback(discussion);
    });
};

module.exports.getDiscussion = getDiscussion;


// function addQuestion(req, res){
//     console.log('addQuestion fired');
//     var sess = session;
//
//     getAllQuestions(req, res);
// };
//
// module.exports.addQuestion = addQuestion;
//
//
// function getAllQuestions(req, res){
//     var allQuestions;
//     QandA.find(function(err, questions){
//         if (err) return console.error(err);
//         allQuestions = questions;
//         return res.render('discussion/QandA', {
//             allQuestions: questions
//         });
//     });
// }
//
// module.exports.getAllQuestions = getAllQuestions;
