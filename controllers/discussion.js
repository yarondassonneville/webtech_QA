var Discussion = require('./../models/discussion');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

function getAll(req, res){
    res.render( 'discussion', { date: new Date().toDateString() } );

};

module.exports.getAll = getAll;

function create(req, res){

    var discussion = new Discussion({ topic: req.body.newDiscussion });
    discussion.save(function (err, discussion) {
    if (err) return console.error(err);
    console.log('succes! new discussion topic ' + discussion.topic);
    });


    res.render('discussion', {date: new Date().toDateString(), topic: discussion.topic});

};

module.exports.create = create;
