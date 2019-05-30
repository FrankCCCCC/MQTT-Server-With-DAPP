//Socket.io and HTTP Server
var app = require('express')();
var http = require('http').Server(app); //Create Node Server
var io = require('socket.io')(http);
//const socketIo = require('socket.io-client');
var socketIo = io("http://localhost:4000/");
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
  console.log("Published");
});

client.on('message', function (topic, message) {//When Recive message
  // message is Buffer
  console.log(message.toString())
  io.sockets.emit('chat message', message.toString());
  console.log(message.toString());

  client.end()
})

//Socket.io firer
io.on('connection', function(socket){
  socket.on('chat message', function(message){
    io.emit('chat message', message);
    console.log(message);
  });
});
