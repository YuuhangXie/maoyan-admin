import homeView from '../views/home.art' // 引入首页模板
import userInfo from '../views/user_detail.art'
import SigninController from './sign'

export default {
    async render(req, res, next) {
        let result = await SigninController.isSignin()

        // 如果没有权限，则返回登录页面
        if (!result.ret) {
            location.href = 'login.html'
        }

        res.render(homeView(req))
        $('.userInfo').html(userInfo({
            username: result.data.username
        }))
    }
}