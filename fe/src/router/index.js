import SMERouter from 'sme-router' // 不加./为从node_modules的.bin目录下开始

// 引入首页和电影列表模板
import home from '../controllers/home'
import movie from '../controllers/movieTable'
import Users from '../controllers/users'

// 两个参数，第一个为向html渲染的id，第二个为通过hash还是html5 history 模式
const router = new SMERouter('router-view', 'hash')

// sme-router 中间件

router.use((req, res, next) => {
    $(`.list-unstyled li a[href="/#${req.url}"]`)
        .parent()
        .addClass('active')
        .siblings()
        .removeClass('active')
})

router.route('/', home.render)
router.route('/movie', movie.render)
router.route('/movieAdd', movie.add)
router.route('/movieEdit', movie.edit)

// 将页面导航到 /, 默认route方法不具备自动导航的功能
router.redirect('/movie')

Users.init()

export default router