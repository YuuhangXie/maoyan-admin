var request = require("request");
var fs = require('fs');
var FormData = require('form-data');


let url = 'http://m.maoyan.com/ajax/movieOnInfoList?token='
let MovieInfoUrl = 'http://m.maoyan.com/ajax/moreComingList?token=P1waA8RGlOgRQTd3pb8lHPdgkoUAAAAA5AgAAFLrm9Yv7LDxvvYLH-CLAPNyi8IGUrmmdBEB0xNI24ZYw9EkDZZum287hF9Af2VGvg&movieIds='

request(url, function(err, res) {
  let movieIds = JSON.parse(res.body).movieIds
  movieIds.forEach(id => {
    request(MovieInfoUrl + id, function (err, res) {
      let movieInfo = JSON.parse(res.body).coming[0]
      movieInfo.img = movieInfo.img.replace('w\.h', '192.270')
      let imgName = movieInfo.img.split('/')[movieInfo.img.split('/').length - 1]
      // 组成form-data
      let form = new FormData()

      form.append('id', movieInfo.id)
      form.append('nm', movieInfo.nm)
      form.append('sc', movieInfo.sc)
      form.append('showInfo', movieInfo.showInfo)
      form.append('showst', movieInfo.showst)
      form.append('star', movieInfo.star || "暂无")
      form.append('version', movieInfo.version)
      form.append('wish', movieInfo.wish)
      form.append('wishst', movieInfo.wishst)
      form.append('comingTitle', movieInfo.comingTitle)
      form.append('rt', movieInfo.rt)
      form.append('img', request(movieInfo.img))

      // 生成头部
      let headers = form.getHeaders()
      headers['x-access-token'] = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inh4IiwiaWF0IjoxNTY4MDk2NDI3fQ.XNZPlJqE-agcZEt2SpnVjlyNXuQXn7itzorWckvAmW4azOx-ue0D9NcIhND9-_zQJJnLnIPX1txTDzrkeRTusFT96sIvgcVtJnJTlE53qf4qDb2mEMi34-Ibmjywjj0yR4gK9UoZDBUbFjnuTglnMUbRfy5OkNd6v2OBqD_DeFxE47VyeuiQ8ZhJO9V3esGUSO8d4X2TRurnMo74n_PmabsJIGA4QHRgcIjSObl5D0z-hLgVle1fb-6MDWrWlHzRLO_AAMCHBjh-yjLgtetwstQNpeDNbMsGuPu2pHzKVRaE9ZQRgaCL0Bo94gKFgmv2KFWs5DDPSFU8BvrUZHyaRA'

      // 模拟表单提交
      form.submit({
        host: '10.60.15.19', // 填写你的前端！！服务器ip地址和端口号
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