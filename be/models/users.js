const mongoose = require('../utils/db')

const Users = mongoose.model('users', {
        username: String,
        password: String,
        email: String
    })
    // 数据库查询 插入 修改功能
module.exports = {
    // 插入功能
    save({ username, password, email }) {
        const users = new Users({
            username,
            password,
            email
        })
        return users.save()
    },

    // 查询功能
    findOne(username) {
        return Users.findOne({ username })
    },

}