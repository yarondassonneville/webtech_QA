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
        userName: sess.userName,
        lat: req.body.locLat,
        lng: req.body.locLng
    });
    discussion.save(function (err, discussion) {
    if (err) return console.error(err);
    console.log('succes! new discussion topic ' + discussion.topic);
    });
    res.send('succes');
    //getAllDiscussions(req, res);
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


function getDiscussion(req, res, pID){
    var jsonDiscussion = {};
    Discussion.findOne({'_id': pID}, 'userName topic _id', function (err, discussion) {
        if(err){
            console.log(err);
        }
        jsonDiscussion.discussion = discussion;
        console.log(discussion);
        console.log('user %s maakte de topic -> %s aan. ID = %s', discussion.userName, discussion.topic, discussion._id);

        // TODO: Filter hier voor de geselecteerde discussion
        QandA.find( { 'topicID': pID }, function(err, qandas){
            if (err) return console.error(err);
            // console.log('getDiscussion qandas : ' + qandas);
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

    if(req.body.newQuestion){
        var qanda = new QandA({
        topicID: sess.getTopic,
        userID: sess.userID,
        userName: sess.userName,
        question: req.body.newQuestion
    });

    qanda.save(function (err, qanda) {
    if (err) return console.error(err);
    console.log('succes! new question ' + qanda.question + 'for topic ' + sess.getTopic);
    });

    res.redirect('/discussion/' + sess.getTopic);
    } else {
    res.redirect('/discussion/' + sess.getTopic);
    }

};
module.exports.addQuestion = addQuestion;

function addAnswer(req, res){
    var sess = session;

    if(req.body.newAnswer){
        var path = req.body.questionID.replace(/"([^"]+(?="))"/g, '$1');
        QandA.findByIdAndUpdate(
    path,
    {$push: {"answers": {userID: sess.userID, userName: sess.userName ,answer: req.body.newAnswer}}},
    {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
    }
);
    console.log("added answer to /discussion/" + sess.getTopic);
    res.redirect("/discussion/" + sess.getTopic);
    } else {
res.redirect("/discussion/" + sess.getTopic);
    }
}
module.exports.addAnswer = addAnswer;
