var request = require("request");
var http = require('http');
var querystring = require('querystring');

var num = 2 // 输入多少页数据

for (var i = 1; i <= num; i++) { // 循环页数获取接口数据
    var url = `https://m.lagou.com/listmore.json?pageNo=${i}&pageSize=15` // 拉钩网接口

    request(url, function(err, res, body) {
        let data = JSON.parse(res.body).content.data.page.result // mock拉勾网数据
        data.forEach((item, index) => {
            var content = querystring.stringify(item) // 将数据数组转换成json
            var options = {
                host: '10.60.15.78',
                port: 8000,
                method: 'POST',
                path: '/api/position/save',
                headers: { // 必须设置cookie绕过登录验证，cookie获取可以看登陆之后的头部信息
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': content.length,
                    'cookie': "session=eyJ1c2VybmFtZSI6ImFkbWluIn0=; session.sig=57PJtMm_Gjw-ssNV97VNqsqYIO0"
                }
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

            req.write(content); // 向接口发送数据
            req.end();
        })
    })
}