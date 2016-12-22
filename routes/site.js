let express = require('express')
let User = require('./../models/user.js')
let Site = require('./../models/site.js')

let router = express.Router()

router.post('/new', (req, res) => {
    if (!req.auth) {
        res.status(401).end()
    }

    let name = req.body.name
    Site.findOne({name: name}, (err, site) => {
        if (site) {
            res.status(200).json({
                status: 'danger',
                msg: '该名称已存在'
            })
        } else {
            
        }
    })
}
module.exports = router
