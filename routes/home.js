let Site = require('./../models/site.js')

module.exports = function (req, res) {
    if (!req.auth) {
        res.redirect('./')
    }
    let user = req.auth
    Site.find({owner: user}, (err, sites) => {
        if (err) {
            console.log(err)
            res.status(500).end()
        } else {
            res.render('home', {
                user: user,
                sites: sites
            })
        }
    })
}
