const bcrypt = require('bcrypt')

module.exports = {
    crypt(myPlaintextPassword) {
        return new Promise((resolve) => {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
                    resolve(hash)
                })
            })
        })
    },

    compare(myPlaintextPassword, hash) {
        return bcrypt.compare(myPlaintextPassword, hash)
    }
}