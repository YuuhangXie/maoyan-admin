const movieListModel = require('../models/movieList')

module.exports = {
    async list(req, res, next) {
        let { page, limit } = req.query
        let data = await movieListModel.list(~~page, ~~limit)
        let count = await movieListModel.total()
        if (data) {
            res.json({
                ret: true,
                currentPage: page,
                limit: limit,
                total: count,
                data
            })
        } else {
            res.json({
                ret: false,
                msg: '数据拉取失败'
            })
        }
    },

    async save(req, res, next) {
        let data = await movieListModel.save(req.body)
        if (data) {
            res.render('succ', {
                data: JSON.stringify({
                    msg: '数据添加成功'
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    msg: '数据添加失败'
                })
            })
        }
    },

    async findone(req, res, next) {
        let data = await movieListModel.findone(req.body._id)
        if (data) {
            res.json({
                ret: true,
                data
            })
        } else {
            res.json({
                ret: false,
                msg: '数据拉取失败'
            })
        }
    },

    async put(req, res, next) {
        let data = await movieListModel.put(req.body)
        if (data) {
            res.render('succ', {
                data: JSON.stringify({
                    msg: '数据修改成功'
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    msg: '数据修改失败'
                })
            })
        }
    },

    async delete(req, res, next) {
        let data = movieListModel.delete(req.body._id)
        if (data) {
            res.render('succ', {
                data: JSON.stringify({
                    msg: '数据删除成功'
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    msg: '数据删除失败'
                })
            })
        }
    }
}

// 接口规范，
// {
//     ret: true,
//     currentPage,
//     total,
//     totalPage,
//     data
// }