var express = require('express')
var router = express.Router()

const Users = require('../controllers/users')

router.post('/signup', Users.signup)
router.post('/signin', Users.signin)
router.get('/signout', Users.signout)
router.get('/isSignin', Users.isSignin)

module.exports = router