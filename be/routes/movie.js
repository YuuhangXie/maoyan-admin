// 引入路由模块

var express = require('express')
var router = express.Router()

// 引入users模块和movie模块
const usersController = require('../controllers/users')
const movieController = require('../controllers/movie')

// 中间件先验证是否登录，在渲染列表
router.get('/list', usersController.isSignin, movieController.list)
router.post('/save', usersController.isSignin, movieController.save)
router.post('/findone', usersController.isSignin, movieController.findone)
router.put('/put', usersController.isSignin, movieController.put)
router.delete('/delete', usersController.isSignin, movieController.delete)
router.post('/search', usersController.isSignin, movieController.search)






module.exports = router