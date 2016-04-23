var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var controller = require('./../controllers/discussion');
var session = require('express-session');
var express = require("express");
var sessFail = "sess.userID does not exist / is false.";
var sessOK = "sess.userID exists."

var app = express();

app.use(session({
  secret: 'kit kat',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));

// Mag maar 1 get/put/delete/etc afgaan denk ik
router.get('/', function(req, res){
  var sess = session;
  if (sess.userID) {
    console.log(sessOK);
    res.redirect("/discussion/all");
  } else {
    console.log(sessFail);
    res.redirect("/");
  }
});

router.get('/all', function(req, res){
  var sess = session;
  if (sess.userID) {
    console.log(sessOK);
    controller.getAll(req, res);
  } else {
    console.log(sessFail);
    res.redirect("/");
  }
});

router.get('/create', function(req, res){
  var sess = session;
  if (sess.userID) {
    console.log(sessOK);
    return res.render('discussion/create', {
      date: new Date().toDateString(),
      // allDiscussions: allDiscussions
    });
  } else {
    console.log(sessFail);
    res.redirect("/");
  }
});

router.get('/:id', function(req, res){
  var sess = session;
  if (sess.userID) {
    console.log(sessOK);
    controller.getDiscussion(req, res, req.params.id, function(callback){
      res.render('discussion/QandA', {
        topic: callback.topic
      });
    });
  } else {
  console.log(sessFail);
  res.redirect("/");
  }
});

router.post('/all', controller.create);


// TODO: POST -> AJAX call

router.post('/create', controller.create);

router.put('/:id', function(req, res){
  res.send("PUT discussion with id " + req.params.id);
});

router.delete('/:id', function(req, res){
  res.send("DELETE discussion with id " + req.params.id);
});

module.exports = router;
