let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    token: String
})

UserSchema.statics = {
}

let User = mongoose.model('User', UserSchema)
module.exports = User
