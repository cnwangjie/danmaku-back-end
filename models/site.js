let mongoose = require('mongoose')

let SiteSchema = new mongoose.Schema({
    id: String,
    name: String,
    domain: String,
    owner: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
})

SiteSchema.statics = {

}

let Site = mongoose.model('Site', SiteSchema)
module.exports = Site
