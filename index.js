var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require("multer");
var pug = require('pug');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

mongoose.connect('mongodb://localhost/qanda');

app.set('view engine', 'pug');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer); // for parsing multipart/form-data

app.use('/', require('./routers/index'));
app.use('/discussion', require('./routers/discussion')(io));

http.listen(3000, function(){
    console.log('listening on *:3000');
});
