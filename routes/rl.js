let crypto = require('crypto')
let hmacToken = require('./../hmacToken.js')
let mongoose = require('mongoose')
let User = require('./../models/user.js')

module.exports = function (req, res) {
    if (req.auth) {
        res.redirect('./home')
    } else if ('method' in req.query) {
        let email = req.body.email
        let password = req.body.password

        let signtrue = crypto.createHmac('sha256', hmacToken)
        signtrue.update(password)
        let handledPassword = signtrue.digest().toString('base64')
        switch (req.query.method) {
            case 'register':
                User.findOne({email: email}, (err, user) => {
                    if (err) {
                        console.log(err)
                        res.status(500).end()
                    } else if (user == null) {
                        let md5 = crypto.createHash('md5')
                        md5.update(Date.now().toString())
                        var token = md5.digest('hex')

                        let newUser = {
                            email: email,
                            password: handledPassword,
                            token: token
                        }
                        User.create(newUser, (err) => {
                            if (err) {
                                console.log(err)
                                res.status(500).end()
                            } else {
                                let msg = {
                                    status: 'success',
                                    msg: '注册成功，请登陆'
                                }
                                res.render('rl', {
                                    msg: msg
                                })
                            }
                        })
                    } else {
                        let msg = {
                            status: 'danger',
                            msg: '邮箱已存在，请尝试登陆'
                        }
                        res.render('rl', {
                            msg: msg
                        })
                    }
                })

                break;
            case 'login':
                User.findOne({email: email}, (err, user) => {
                    if (err) {
                        console.log(err)
                        res.status(500).end()
                    } else if (user == null) {
                        let msg = {
                            status: 'danger',
                            msg: '尚未注册'
                        }
                        res.render('rl', {
                            msg: msg
                        })
                    } else if (user.password != handledPassword) {
                        let msg = {
                            status: 'danger',
                            msg: '密码错误'
                        }
                        res.render('rl', {
                            msg: msg
                        })
                    } else {
                        let token = user.token
                        let cookie = {
                            email: email,
                            token: token
                        }
                        let uss = new Buffer(JSON.stringify(cookie).toString('base64'))
                        res.cookie('uss', uss, {maxAge: 604800000})
                        res.redirect('./home')
                    }
                })

                break;
            default:
                res.status(300).end()
        }
    } else {
        res.render('rl', {
            msg:false
        })
    }
}
