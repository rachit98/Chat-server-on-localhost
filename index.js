var path = require('path');

var express = require("express");
var app = express();

var http = require('http');
var server = http.createServer(app);

var io = require('socket.io')(server)


app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function(socket){

    console.log("User Connected")

    socket.on('disconnect', function(){
        console.log("User Disconnected");
    });

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

});

server.listen(5000, function(){
    console.log("Server Running")
});