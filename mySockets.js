var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require("multer");
var pug = require('pug');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mySockets = function(){
    io.sockets.on('connection',function(socket){
        console.log("connection made");

        socket.on('disconnect', function(){
            console.log('user disconnected');
        });

        socket.on('chat message', function (data) {
            socket.emit('chatback', {'hello' : 'world'});
            console.log(data);
        });

    });
}

module.exports = mySockets;
