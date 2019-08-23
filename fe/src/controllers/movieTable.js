import movieView from '../views/movie.art'
import movieListView from '../views/movieList.art'
import SigninController from './sign'
import movieList from './users'

function handleBtnAll(e) {
    if ($(e.target).prop('checked')) {
        $('.movieList-btn').prop('checked', true)
    } else {
        $('.movieList-btn').prop('checked', false)
    }
}

function handleBtn(e) {
    let checkAll = true
    $('.movieList-btn').each(function() {
        $(this).prop('checked') === false ? checkAll = false : ''
    })
    console.log(checkAll)
    checkAll === true ? $('.movieList-btn-all').prop('checked', true) : $('.movieList-btn-all').prop('checked', false)
}

export default {
    async render(req, res, next) {
        let result = await SigninController.isSignin()

        // 如果没有权限，则返回登录页面
        if (!result.ret) {
            location.href = 'login.html'
        }

        // 渲染table
        let dataList = await movieList.getMovieList(1, 10)
        res.render(movieView({
            list: dataList.data
        }))

        $('#page').bootstrapPaginator({
            bootstrapMajorVersion: 3, //bootstrap版本
            currentPage: 1, //当前页码
            totalPages: Math.ceil(dataList.total / dataList.limit), //总页数（后台传过来的数据）
            numberOfPages: 6, //一页显示几个按钮
            itemTexts: function(type, page, current) {
                switch (type) {
                    case "first":
                        return "首页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "末页";
                    case "page":
                        return page;
                }
            }, //改写分页按钮字样
            onPageClicked: async function(event, originalEvent, type, page) {
                $('.checkbox-template').unbind()
                let dataList = await movieList.getMovieList(page, 10)
                console.log(dataList)
                $('#router-view tbody').html(movieListView({
                    list: dataList.data
                }))
                $('.movieList-btn').on('click', handleBtn.bind(this))
                $('.movieList-btn-all').prop('checked', false)
                $('.movieList-btn-all').on('click', handleBtnAll.bind(this))
            }
        });
        $('.movieList-btn').on('click', handleBtn.bind(this))
        $('.movieList-btn-all').on('click', handleBtnAll.bind(this))

    }
}