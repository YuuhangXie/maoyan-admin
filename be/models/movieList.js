const mongoose = require('../utils/db')

const MovieIds = mongoose.model('movieLists', {
    id: String,
    haspromotionTag: Boolean,
    img: String,
    version: String,
    nm: String,
    preShow: Boolean,
    sc: Number,
    globalReleased: Boolean,
    wish: Number,
    star: String,
    rt: String,
    showInfo: String,
    showst: Number,
    wishst: Number,
    comingTitle: String
})

module.exports = {
    list(page, limit) {
        return MovieIds.find({}).sort({ _id: -1 }).limit(limit).skip((page - 1) * limit)
    },

    total() {
        return MovieIds.count({})
    },

    findone(_id) {
        return MovieIds.findById(_id)
    },

    save(data) {
        let model = new MovieIds(data)
        return model.save()
    },

    put(data) {
        return MovieIds.updateOne({ _id: data._id }, data)
    },

    delete(_id) {
        return MovieIds.deleteOne({ _id: _id })
    },

    search(filter) {
        return MovieIds.find(filter)
    },

    matchCount(filter) {
        return MovieIds.count(filter)
    }
}