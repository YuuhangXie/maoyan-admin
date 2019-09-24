var request = require("request");
var http = require('http');
var https = require('https');
var fs = require('fs');
var FormData = require('form-data');

// 创建uploads文件夹存储下载的图片
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('uploads')
}

let url = 'http://m.maoyan.com/ajax/movieOnInfoList?token='
let MovieInfoUrl = 'http://m.maoyan.com/ajax/moreComingList?token=P1waA8RGlOgRQTd3pb8lHPdgkoUAAAAA5AgAAFLrm9Yv7LDxvvYLH-CLAPNyi8IGUrmmdBEB0xNI24ZYw9EkDZZum287hF9Af2VGvg&movieIds='

request(url, function(err, res) {
  let movieIds = JSON.parse(res.body).movieIds
  movieIds.forEach(id => {
    request(MovieInfoUrl + id, function (err, res) {
      let movieInfo = JSON.parse(res.body).coming[0]
      movieInfo.img = movieInfo.img.replace('w\.h', '192.270')
      let imgName = movieInfo.img.split('/')[movieInfo.img.split('/').length - 1]

      request.get(movieInfo.img)
        .pipe(fs.createWriteStream(`./uploads/${imgName}`))
        .on('close', function () {
          // 组成form-data
          let form = new FormData()

          form.append('img', fs.createReadStream(`./uploads/${imgName}`))
          form.append('id', movieInfo.id)
          form.append('nm', movieInfo.nm)
          form.append('sc', movieInfo.sc)
          form.append('showInfo', movieInfo.showInfo)
          form.append('showst', movieInfo.showst)
          form.append('star', movieInfo.star)
          form.append('version', movieInfo.version)
          form.append('wish', movieInfo.wish)
          form.append('wishst', movieInfo.wishst)
          form.append('comingTitle', movieInfo.comingTitle)
          form.append('rt', movieInfo.rt)

          // 生成头部
          let headers = form.getHeaders()
          headers['x-access-token'] = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inh4IiwiaWF0IjoxNTY3ODU0MTk2fQ.L0wPWaMPXBlT6JseXgNtlo1HgZ_3uDVnvPw43wqqGE-DyPvVgM7zcJ-rTLbzQMIPCAiMBw6kX5EEXu2-OmH2PJHdplxXdVhnQHzWCwIZzCrkIacsKyY-de3buYtDp014i4wb79C_W2kcdy17OkZzgfJd-MWVjNIjpO1tTR5CNVEnnQpGzzxNg7dOtLF2DVPeqyLW8E9SANeyFxgPxMQ5FZwlC6ltMKuRVOcC88FpvnWZ_4z5c5hhmFFw3-Z7irbvu7v3XiSWr3GpbcWXB0qdmM-PDRmDEWTEGgOkUQsqjJ-i_dnMoJqoHiumge1rKiq3OYwVkOCgnK96sbser0FNgg'

          // 模拟表单提交
          form.submit({
            host: '10.60.15.3', // 填写你的前端！！服务器ip地址和端口号
            port: 8080,
            method: 'POST',
            path: '/api/movie/save', // 这里改成你自己的
            headers: headers // 头部添加
          }, function(err, res) {
            // console.log(res.statusCode);
          })
          form = null
        })
    })
  })
})