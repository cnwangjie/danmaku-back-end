let User = require('./models/user.js')

module.exports = function (req, res, next) {
    if (req.cookies.uss) {
        var uss = JSON.parse(new Buffer(req.cookies.uss, 'base64').toString())
        User.findOne({email: uss.email}, (err, user) => {
            if (err) {
                console.log(err)
            } else if (user == null) {
            } else if (user.token == uss.token) {
                req.auth = uss.email
            }
            next()
        })
    } else if (req.body.user && req.body.token) {
        let email = req.body.user
        let token = req.body.token
        User.findOne({email: email}, (err, user) => {
            if (err) {
                console.log(err)
            } else if (user == null) {
            } else if (token == user.token) {
                req.auth = email
            }
            next()
        })
    } else {
        next()
    }
}
