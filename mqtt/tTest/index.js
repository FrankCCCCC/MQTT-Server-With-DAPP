//Socket.io and HTTP Server
const express = require('express');
var app = express();
var http = require('http').Server(app); //Create Node Server
var sio = require('socket.io')(http);
//const socketIo = require('socket.io-client');

var port = process.env.PORT || 4000;
http.listen(port, function(){
  console.log('listening on *:' + port);
});

app.get('/', function(req, res){//Handle Get/
  res.sendFile(__dirname + '/index.html');
});

//MQTT Client to Subscribe
var mqtt = require('mqtt');
//var client  = mqtt.connect('mqtt://test.mosquitto.org')
var client  = mqtt.connect('mqtt://127.0.0.1');

client.on('connect', function () {//When client connect to broker
  client.subscribe('presence');
  console.log("Subscribe");
  client.publish('presence', 'Hello mqtt');
  client.publish('presence', 'Second Hello mqtt');
  console.log("Published");
});

var msg = "";

client.on('message', function (topic, message) {//When Recive message
  // message is Buffer
  msg = message.toString();
  console.log(message.toString())
  sio.emit('chat message', message.toString());
  console.log("After emit: " + message.toString());

  client.end();
});

//Socket.io firer
sio.on('connection', function(socket){
  //socket.on('chat message', function(message){
    sio.emit('chat message', msg);
    console.log(msg);
    msg = "";
  //});
});
