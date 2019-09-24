var request = require("request");
var http = require('http');
var https = require('https');
var fs = require('fs');
var FormData = require('form-data');


/**
 * 使用指南，将此文件放入be文件夹下，会自动创建出uploads文件。
 * 需要用到的模块  form-data  request   自行yarn
 * 思路，拉勾网接口mock数据然后遍历图片地址一次下载到本地，在模拟表单提交到数据库
 */

// 创建uploads文件夹存储下载的图片
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('uploads')
}


var num = 1 // 输入多少页数据

let imgurl = 'https://www.lgstatic.com/' // 用来补全img的地址


var count = 1
for (var i = 1; i <= num; i++) { // 循环页数获取接口数据
    var url = `https://m.lagou.com/listmore.json?pageNo=${i}&pageSize=1` // 拉勾网接口

    request(url, function(err, res, body) {
        let data = JSON.parse(res.body).content.data.page.result // mock拉勾网数据
        data.forEach((item, index) => {
            let logoUrl = item.companyLogo.split('/')[item.companyLogo.split('/').length - 1]
            logoUrl = logoUrl.split('?')[0]
            console.log(logoUrl)
            request.get(imgurl + item.companyLogo)
                .pipe(fs.createWriteStream(`./uploads/${logoUrl}`))
                .on('close', function() {
                    // 组成form-data
                    let form = new FormData();

                    form.append('companyLogo', fs.createReadStream(`./uploads/${logoUrl}`));
                    form.append('city', item.city);
                    form.append('companyName', item.companyName);
                    form.append('positionName', item.positionName);
                    form.append('salary', item.salary);

                    // 生成头部
                    var headers = form.getHeaders();
                    headers['x-access-token'] = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTY2ODg5NDI2fQ.bjoEUEhino4j9QKsHwD55MaolXV1RMab1gpNSdE6oqdhULaqsB3reNblOs5KCs8Gjv3h86lmAMU6_UsBfvnwBfVpmZgkzKI7FUtdJL0CE-E0KISpSlIJdF6dpZr0hC0nJnvNyUb_SV_Cei3ANLFWWhKq6Mdz3iacn1ITLgnFg_9JKVapC3ZKaa1lAu-7XfoLNoQS-ivohO4bKu5y88PtDPqWfb4lWlG4L3Dy06K-_cvOSys7RnUce79N9Df03ymLEnjfn9A1mxCi4r94UFSH9eJqT9Y3sMBD4aIZWQeokq0tm-Q2m4pbzbSRsf6y0KVuK-hV5XnKRO5_QDmwpGMJnw'

                    // 模拟表单提交
                    form.submit({
                        host: '10.60.15.78', // 填写你的前端！！服务器ip地址和端口号
                        port: 8080,
                        method: 'POST',
                        path: '/api/position/save', // 这里改成你自己的
                        headers: headers // 头部添加
                    }, function(err, res) {
                        console.log(res.statusCode);
                    })
                    form = null
                })
        })
    })
}
