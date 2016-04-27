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
    controller.getAllDiscussions(req, res);
  } else {
    console.log(sessFail);
    res.redirect("/");
  }
});

router.get('/create', function(req, res){
  var sess = session;
  if (sess.userID) {
    console.log(sessOK);
    return res.render('discussion/createDiscussion', {
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
    sess.getTopic = req.params.id;
    console.log('sess.getTopic = ' + sess.getTopic);
    controller.getDiscussion(req, res, req.params.id);
  } else {
  console.log("sessFail");
  res.redirect("/");
  }
});

router.post('/all', controller.createDiscussion);

router.post('/answer', function(req, res){
    controller.addAnswer(req, res);
});

router.post('/question', function(req, res){
    controller.addQuestion(req, res);
});

// TODO: POST -> AJAX call

router.post('/create', controller.createDiscussion);


module.exports = router;
