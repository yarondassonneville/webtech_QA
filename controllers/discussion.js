var Discussion = require('./../models/discussion');
var QandA = require('./../models/QandA');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');


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
    Discussion.findOne({'_id': pID}, 'userName topic _id userID', function (err, discussion) {
        if(err){
            console.log(err);
        }
        jsonDiscussion.discussion = discussion;
        console.log(discussion);
        console.log('user %s maakte de topic -> %s aan. ID = %s', discussion.userName, discussion.topic, discussion._id);
        
        var sess = session;
        
        if(discussion.userID == sess.userID){
            var myDiscussion = true;
        } else {
            var myDiscussion = false;
        }
        
        // TODO: Filter hier voor de geselecteerde discussion
        QandA.find( { 'topicID': pID }, function(err, qandas){
            if (err) return console.error(err);
            // console.log('getDiscussion qandas : ' + qandas);
            jsonDiscussion.qandas = qandas;
            res.render('discussion/QandA', {
                topic: jsonDiscussion.discussion.topic,
                allQandAs: jsonDiscussion.qandas,
                myDiscussion: myDiscussion
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

function createDiscussion(data, newDiscussion){
    var sess = session;

    var discussion = new Discussion({
        topic: data.newDiscussion,
        userID: sess.userID,
        userName: sess.userName,
        lat: data.locLat,
        lng: data.locLng
    });

    discussion.save(function (err, discussion) {
        if (err) return console.error(err);
        console.log('succes! new discussion topic ' + discussion.topic);
        newDiscussion(discussion);
    });
};
module.exports.createDiscussion = createDiscussion;

function addQuestion(data, newQuestion){
    var sess = session;

    var qanda = new QandA({
    topicID: sess.getTopic,
    userID: sess.userID,
    userName: sess.userName,
    question: data.newQuestion
    })

    qanda.save(function (err, qanda) {
        if (err) return console.error(err);
        console.log('succes! new question ' + qanda.question + 'for topic ' + sess.getTopic);
        newQuestion(qanda);
    });

};
module.exports.addQuestion = addQuestion;

function addAnswer(data, newAnswer){
    var sess = session;
    var path = data.questionID.replace(/"([^"]+(?="))"/g, '$1');
    QandA.findByIdAndUpdate(
        path,
        {$push: {"answers": {userID: sess.userID, userName: sess.userName ,answer: data.newAnswer}}},
        {safe: true, upsert: true},
        function(err, model) {
            console.log(err);
            newData = {
                answer: data.newAnswer,
                qID: path
            }
            newAnswer(newData);
        }
    );
    console.log("added answer "+ data.newAnswer +" to /discussion/" + sess.getTopic);
}
module.exports.addAnswer = addAnswer;
