var Discussion = require('./../models/discussion');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

function getAll(req, res){
    var allDiscussions;
    Discussion.find(function(err, discussions){
        if (err) return console.error(err);
        allDiscussions = discussions;
        return res.render('discussion', {
            date: new Date().toDateString(),
            allDiscussions: allDiscussions
          });
    });
};

module.exports.getAll = getAll;

function create(req, res){

    var discussion = new Discussion({ topic: req.body.newDiscussion, user: req.body.userNameField });
    discussion.save(function (err, discussion) {
    if (err) return console.error(err);
    console.log('succes! new discussion topic ' + discussion.topic);
    });

    getAll(req, res);
};

module.exports.create = create;