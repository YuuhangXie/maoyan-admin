var request = require("request");
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path')
var FormData = require('form-data');
var form = new FormData();

form.append('img', fs.createReadStream("./uploads/005955214d5b3e50c910d7a511b0cb571445301.jpg"));
form.append('id', '13579');
form.append('nm', 'nodejs');
form.append('star', 'nodejs');
form.append('rt', 'nodejs');

var headers = form.getHeaders(); // 这个不能少
headers.Cookie = 'uuid_n_v=v1; ci=1%2C%E5%8C%97%E4%BA%AC; iuuid=C09A52A0C32B11E993E773C2ADF55BA786E5E0FDCC5E4C2B9C12F4D4C970C191; selectci=; session=eyJ1c2VybmFtZSI6InhpYW9taW5nIn0=; session.sig=nZSNhNS67bLF2bJFhQrugRD53-k'

var options = {
    host: '10.60.15.3',
    port: 8080,
    method: 'POST',
    path: '/api/movie/save',
    headers: headers
};

var req = http.request(options, function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);
    var _data = '';
    res.on('data', function(chunk) {
        _data += chunk;
    });
    res.on('end', function() {
        console.log("\n--->>\nresult:", _data)
    });
});

form.pipe(req);


//get请求
var url = 'http://m.maoyan.com/ajax/moreComingList?token=P1waA8RGlOgRQTd3pb8lHPdgkoUAAAAA5AgAAFLrm9Yv7LDxvvYLH-CLAPNyi8IGUrmmdBEB0xNI24ZYw9EkDZZum287hF9Af2VGvg&movieIds='
    // request('http://m.maoyan.com/ajax/movieOnInfoList', function(error, res, body) {
    //     let data = JSON.parse(res.body)
    //     let ids = data.movieIds
    //     let dataFist = data.movieList
    //     ids.forEach((id, index) => {
    //         request(url + id, function(err, res) {
    //             let movieInfo = JSON.parse(res.body).coming[0]
    //             movieInfo['img'] = 'https://p0.meituan.net/50.50/' + movieInfo['img'].split('w.h/')[1];
    //             movieInfo['img'] = movieInfo['img'].split('/')[5];

//             var content = querystring.stringify(movieInfo) // 将数据数组转换成json
//             var options = {
//                 host: '10.60.15.3',
//                 port: 8080,
//                 method: 'POST',
//                 path: '/api/movie/save',
//                 headers: { // 必须设置cookie绕过登录验证，cookie获取可以看登陆之后的头部信息
//                     'Content-Type': 'multipart/form-data;',
//                     'Content-Length': content.length,
//                     'cookie': 'uuid_n_v=v1; ci=1%2C%E5%8C%97%E4%BA%AC; iuuid=C09A52A0C32B11E993E773C2ADF55BA786E5E0FDCC5E4C2B9C12F4D4C970C191; selectci=; session=eyJ1c2VybmFtZSI6InhpYW9taW5nIn0=; session.sig=nZSNhNS67bLF2bJFhQrugRD53-k'
//                 }
//             };
//             // var req = http.request(options, function(res) {
//             //     console.log("statusCode: ", res.statusCode);
//             //     console.log("headers: ", res.headers);
//             //     var _data = '';
//             //     res.on('data', function(chunk) {
//             //         _data += chunk;
//             //     });
//             //     res.on('end', function() {
//             //         console.log("\n--->>\nresult:", _data)
//             //     });
//             // });

//             // req.write(content); // 向接口发送数据
//             // req.end();
//         })
//     })
// });






module.exports = request