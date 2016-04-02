var Discussion = require('./../models/discussion');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

function getAll(req, res){
    res.render( 'discussion', { date: new Date().toDateString() } );

};

module.exports.getAll = getAll;

function create(req, res){

    // console.log(req.body.newDiscussion); // returns undefined :(
    var discussion = new Discussion({ user: 'Hardcoded result' });
    discussion.save(function (err, discussion) {
    if (err) return console.error(err);
    console.log('succes! saved user ' + discussion.user);
    });


    res.render('discussion', {date: new Date().toDateString(), newDiscussion: discussion.user});

};

module.exports.create = create;
