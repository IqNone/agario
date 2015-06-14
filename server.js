var express = require('express.io');
var app = express().http().io();

var c = require('./server_config.json');

app.io.route('ready', function(req) {
    req.session.name = req.data;
    req.session.save(function() {
        req.io.emit('get-feelings')
    })
});

app.io.on('connection', function(socket){
    console.log("connection");
});

app.post("/wsip", function (req, res) {
    res.send(c.wsip);
});

app.get("/info", function (req, res) {
    res.sendfile('./info.json');
});

/** resolve the client*/
app.get('/', function(req, res) {
    res.sendfile("./client/index.html");
});

app.get('/main_out.js', function(req, res) {
    res.sendfile("./client/main_out.js");
});

app.get('/css/bootstrap.min.css', function(req, res) {
    res.sendfile("./client/css/bootstrap.min.css");
});

app.get('/js/jquery.js', function(req, res) {
    res.sendfile("./client/js/jquery.js");
});

app.listen(c.port);