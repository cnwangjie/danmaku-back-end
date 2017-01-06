let express = require('express')
let User = require('./../models/user.js')
let Site = require('./../models/site.js')
let uuid = require('uuid')

let router = express.Router()

router.use((req, res, next) => {
    if (!req.auth) {
        res.status(401).end()
    } else {
        next()
    }
})

router.post('/new', (req, res) => {
    let name = req.body.name
    Site.findOne({name: name}, (err, site) => {
        if (err) {
            console.log(err)
            res.status(500).end()
        } else if (site) {
            res.status(200).json({
                status: 'danger',
                msg: '该名称已存在'
            })
        } else {
            let newSite = {
                id: uuid(),
                name: name,
                owner: req.auth
            }
            Site.create(newSite, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    res.status(200).json({
                        status: 'success',
                        msg: '创建成功'
                    })
                }
            })
        }
    })
})

router.post('/setdomain', (req, res) => {

})

router.post('/delete', (req, res) => {
    
})

module.exports = router
