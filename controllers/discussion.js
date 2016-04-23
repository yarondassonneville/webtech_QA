var Discussion = require('./../models/discussion');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');

function getAll(req, res){
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

module.exports.getAll = getAll;

function create(req, res){
    var sess = session;
    var discussion = new Discussion({ topic: req.body.newDiscussion, userID: sess.userID, userName: sess.userName });
    discussion.save(function (err, discussion) {
    if (err) return console.error(err);
    console.log('succes! new discussion topic ' + discussion.topic);
    });

    getAll(req, res);
};

module.exports.create = create;

function getDiscussion(req, res, pTopic){
    Discussion.findOne({'topic': pTopic}, 'user topic _id', function (err, discussion) {
        if (err) return handleError(err);
        console.log('user %s maakte de topic -> %s aan. ID = %s', discussion.user, discussion.topic, discussion._id);
        // Space Ghost is a talk show host.)
    });
};



module.exports.getDiscussion = getDiscussion;
