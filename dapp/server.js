const ip = "127.0.0.1";
const port = "1001";
const http = require('http');

function handlePost(){
    
}

server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!\n');
});

server.listen(port, ip);

console.log("Server is runing at http://" + ip + ":" + port);

