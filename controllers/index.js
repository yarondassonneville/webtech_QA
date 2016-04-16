var User = require('./../models/index');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

function create(req, res){
    var user = new User({ user: req.body.username, password: req.body.password });
    user.save(function (err, user) {
    if (err) return console.error(err);
        console.log('succes! new user was made: ' + user.user);
    });
};

module.exports.create = create;

function login(req, res){
    var login = new User({ user: req.body.usernameLog, password: req.body.passwordLog });
    User.find({ user: req.body.usernameLog, password: req.body.passwordLog }, function(err, user) {

        if (err) {

            console.log('Signin error');
            return done(err);
        }

        //if user found.
        if (user.length!=0) {
          if(user[0].user && user[0].password){
            console.log('Username already exists, username: ' + username);                         
             }else{
                console.log('EMAIL already exists, email: ' + password);      
             }                                    
             var err = new Error();
            err.status = 310;
            return done(err);

        }
});
              };

module.exports.login = login;