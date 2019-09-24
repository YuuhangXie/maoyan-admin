const mongoose = require('../utils/db')
var request = require("request");
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path')
var querystring = require('querystring');

const MovieIds = mongoose.model('movieLists', {
    id: String,
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
    console.log(ids.length)
    ids.forEach((id, index) => {
        request(url + id, function(err, res) {
            let movieInfo = JSON.parse(res.body).coming[0];
            movieInfo['img'] = 'https://p0.meituan.net/50.50/' + movieInfo['img'].split('w.h/')[1];
            movieInfo['img'] = movieInfo['img'].split('/')[5];
            new MovieIds(movieInfo).save()
        })
    })
});


module.exports = request