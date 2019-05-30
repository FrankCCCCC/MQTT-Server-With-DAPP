const ip = "127.0.0.1";
const port = 3800;
const http = require('http');
const url = require('url');
const util = require('util');
const express = require("express");

var app = express();


function handlePost(){
    
}

server = http.createServer(function(req, res){
    res.writeHeader(200, {'Content-Type':'text/javascript;charset=UTF-8'});
    //res.write('Hello World!\n');
    res.end();

}).listen(port, ip);

console.log("Server is runing at http://" + ip + ":" + port);

// var http = require('http');
// var url = require('url');
// var util = require('util');
 
// //req 请求信息   res返回信息
// http.createServer(function(req, res){
//     res.writeHeader(200, {'Content-Type':'text/javascript;charset=UTF-8'});  //状态码+响应头属性
 
//     // 解析 url 参数
//     var params = url.parse(req.url, true).query;  //parse将字符串转成对象,req.url="/?url=123&name=321"，true表示params是{url:"123",name:"321"}，false表示params是url=123&name=321
//     res.write("网站名：" + params.name);
//     res.write("\n");
//     res.write("网站 URL：" + params.url);
//     res.end();
 
// }).listen(3800, "127.0.0.1");