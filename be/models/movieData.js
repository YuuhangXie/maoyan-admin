const mongoose = require('../utils/db')
var request = require("request");

const MovieIds = mongoose.model('movieLists', {
    id: Number,
    haspromotionTag: Boolean,
    img: String,
    version: String,
    nm: String,
    preShow: Boolean,
    sc: Number,
    globalReleased: Boolean,
    wish: Number,
    star: String,
    rt: String,
    showInfo: String,
    showst: Number,
    wishst: Number,
    comingTitle: String
})

//get请求
var url = 'http://m.maoyan.com/ajax/moreComingList?token=P1waA8RGlOgRQTd3pb8lHPdgkoUAAAAA5AgAAFLrm9Yv7LDxvvYLH-CLAPNyi8IGUrmmdBEB0xNI24ZYw9EkDZZum287hF9Af2VGvg&movieIds='
request('http://m.maoyan.com/ajax/movieOnInfoList', function(error, res, body) {
    let data = JSON.parse(res.body)
    let ids = data.movieIds
    let dataFist = data.movieList
    dataFist.forEach((item, index) => {
        let movieInfo = new MovieIds(item)
        movieInfo.save()
    })
    console.log(ids.length)
    ids.forEach((id, index) => {
        request(url + id, function(err, res) {
            let detail = JSON.parse(res.body).coming[0]
            let movieInfo = new MovieIds(detail)
            movieInfo.save()
        })
    })
});



module.exports = request