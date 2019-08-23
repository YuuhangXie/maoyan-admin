import movieView from '../views/movie.art'
import movieListView from '../views/movieList.art'
import movieAddView from '../views/movieAdd.art'

import SigninController from './sign'
import movieList from './users'

// 全选按钮点击事件处理函数
function handleBtnAll(e) {
    if ($(e.target).prop('checked')) {
        $('.movieList-btn').prop('checked', true)
    } else {
        $('.movieList-btn').prop('checked', false)
    }
}

// 单个按钮点击事件处理函数
function handleBtn(e) {
    let checkAll = true
    $('.movieList-btn').each(function() {
        $(this).prop('checked') === false ? checkAll = false : ''
    })
    checkAll === true ? $('.movieList-btn-all').prop('checked', true) : $('.movieList-btn-all').prop('checked', false)
}

// 添加分页
function addPaginator(dataList) {
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
                // 每次渲染添加事件
            $('.movieList-btn').on('click', handleBtn.bind(this))
            $('.movieList-btn-all').prop('checked', false)
            $('.movieList-btn-all').on('click', handleBtnAll.bind(this))
        }
    });
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

        // 全选框 / 复选框实现
        $('.movieList-btn').on('click', handleBtn.bind(this))
        $('.movieList-btn-all').on('click', handleBtnAll.bind(this))

        // 添加分页
        addPaginator.call(this, dataList)

        // 点击添加事件
        $('.movie-add').on('click', function() {
            res.go('/movieAdd')
        })
    },

    async add(req, res, next) {
        let result = await SigninController.isSignin()

        // 如果没有权限，则返回登录页面
        if (!result.ret) {
            location.href = 'login.html'
        }

        // 渲染添加影片页面
        res.render(movieAddView({}))

        $('.dropdown-item').on('click', () => {
            res.back()
        })

        $('.movie-add-submit').on('click', (e) => {
            e.preventDefault()
            let data = $('#movie-save').serialize()
            $.ajax({
                url: '/api/movie/save',
                data,
                type: 'POST',
                success(result) {
                    if (result.ret) {
                        res.back()
                    } else {
                        alert(result.data.msg)
                    }
                }
            })
        })
    },

    async edit(req, res, next) {
        let result = await SigninController.isSignin()

        // 如果没有权限，则返回登录页面
        if (!result.ret) {
            location.href = 'login.html'
        }
    }
}