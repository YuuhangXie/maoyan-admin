const userModel = require('../models/users')
const tokenUtil = require('../utils/token')
const tools = require('../utils/tools')

module.exports = {
    async signup(req, res, next) {
        res.set('content-type', 'application/json;charset=utf-8')
        let { username, password, email } = req.body

        // 判断用户是否存在
        let result = await userModel.findOne(username)

        if (!result) {
            // 密码加密
            let newPassword = await tools.crypt(password)

            // 存到数据库
            await userModel.save({
                username,
                password: newPassword,
                email
            })

            // 给前端返回接口
            res.render('succ', {
                data: JSON.stringify({
                    msg: '用户注册成功'
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    msg: '用户名已存在'
                })
            })
        }
    },

    async signin(req, res, next) {
        res.set('content-type', 'application/json;charset=utf-8')
        let { username, password } = req.body
            // 从数据库里根据用户名取出用户信息
        let result = await userModel.findOne(username)
        if (result) {
            // 等待密码和解密后的密码匹配结果
            if (await tools.compare(password, result.password)) {

                // 生成秘钥
                let token = tokenUtil.sign({
                    username
                })

                // 放入头部
                res.set('X-Access-Token', token)

                res.render('succ', {
                    data: JSON.stringify({
                        msg: '用户登录成功',
                        username
                    })
                })
            } else {
                res.render('fail', {
                    data: JSON.stringify({
                        msg: '账号或密码错误'
                    })
                })
            }
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    msg: '账号或密码错误'
                })
            })
        }
    },

    async isSignin(req, res, next) {
        res.set('content-type', 'application/json;charset=utf-8')

        // 获取并验证token
        let token = req.get('x-access-token')
        let result = await tokenUtil.verify(token)
        if (result) {
            if (req.url === '/isSignin') {
                res.render('succ', {
                    data: JSON.stringify({
                        msg: '用户有权限',
                        username: result.username
                    })
                })
            } else {
                next()
            }
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    msg: '用户没有权限'
                })
            })
        }
    },

    async signout(req, res, next) {
        req.session = null
        res.render('succ', {
            data: JSON.stringify({
                msg: '用户登出成功'
            })
        })
    }
}