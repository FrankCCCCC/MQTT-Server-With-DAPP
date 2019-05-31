var mosca = require('mosca');

var ascoltatore = {
  //using ascoltatore
  //type: 'mongo',
  //url: 'mongodb://localhost:27017/mqtt',
  //pubsubCollection: 'ascoltatori',
  //mongo: {}
};

var settings = {
  port: 1883, 
  backend: ascoltatore
};
// Set up a Mosca server (MQTT server)
var server = new mosca.Server(settings);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet.payload);
  
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}

// 作者：Songzh
// 链接：https://www.jianshu.com/p/9e74287e3b07
// 来源：简书
// 简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。