var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

var user = require('./models/user');
var chat = require('./models/chat');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

mongoose.connect('mongodb://localhost:27017/mongooseTest');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("mongo successfully connected");
});

io.on('connection', function(socket){
    console.log('Socket succesfully connected with id: '+socket.id);
    insert_obj = {};
    insert_obj.user_id = socket.id;
    var log_obj = new user(insert_obj);
    log_obj.save(function (err) {
        if (err) throw err;
    });

    socket.on('chat_message', function(msg){
        console.log('message: '+socket.id+'===' + msg);
        socket.broadcast.emit('abc',{data:msg});

        insert_obj = {};
        insert_obj.user_id = socket.id;
        insert_obj.msg = msg;
        var chat_obj = new chat(insert_obj);
        chat_obj.save(function (err) {
            if (err) throw err;
            socket.broadcast.emit('abc',{data:msg});
        });
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});