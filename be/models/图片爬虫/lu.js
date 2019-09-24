var request = require("request");
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path')
var querystring = require('querystring');


//get请求
var url = 'http://m.maoyan.com/ajax/moreComingList?token=P1waA8RGlOgRQTd3pb8lHPdgkoUAAAAA5AgAAFLrm9Yv7LDxvvYLH-CLAPNyi8IGUrmmdBEB0xNI24ZYw9EkDZZum287hF9Af2VGvg&movieIds='
request('http://m.maoyan.com/ajax/movieOnInfoList', function(error, res, body) {
    let data = JSON.parse(res.body)
    let ids = data.movieIds
    let dataFist = data.movieList
    console.log(ids.length)
});



module.exports = request

// var content = querystring.stringify(item) // 将数据数组转换成json
//             var options = {
//                 host: '10.60.15.78',
//                 port: 8000,
//                 method: 'POST',
//                 path: '/api/position/save',
//                 headers: { // 必须设置cookie绕过登录验证，cookie获取可以看登陆之后的头部信息
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                     'Content-Length': content.length,
//                     'cookie': "session=eyJ1c2VybmFtZSI6ImFkbWluIn0=; session.sig=57PJtMm_Gjw-ssNV97VNqsqYIO0"
//                 }
//             };
//             var req = http.request(options, function(res) {
//                 console.log("statusCode: ", res.statusCode);
//                 console.log("headers: ", res.headers);
//                 var _data = '';
//                 res.on('data', function(chunk) {
//                     _data += chunk;
//                 });
//                 res.on('end', function() {
//                     console.log("\n--->>\nresult:", _data)
//                 });
//             });

//             req.write(content); // 向接口发送数据
//             req.end();