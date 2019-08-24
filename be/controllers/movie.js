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
        let data = await movieListModel.delete(req.body._id)
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
    },

    async search(req, res, next) {
        var keyword = req.body.keyword // 获取查询的字段

        var _filter = {
            $or: [ // 多字段同时匹配
                { id: { $regex: keyword } },
                { rt: { $regex: keyword, $options: '$i' } }, //  $options: '$i' 忽略大小写
                { nm: { $regex: keyword, $options: '$i' } },
                { star: { $regex: keyword, $options: '$i' } }
            ]
        }
        let data = await movieListModel.search(_filter)
        let count = await movieListModel.matchCount(_filter)
        if (data) {
            res.json({
                ret: true,
                data,
                total: count
            })
        } else {
            res.json({
                ret: false,
                msg: '数据拉取失败'
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