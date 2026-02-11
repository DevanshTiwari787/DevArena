let mongoose = require("mongoose")
let Schema = mongoose.Schema

let userSchema = new Schema({
    username : {
        type : String,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

let userModel = mongoose.model('User', userSchema)
module.exports = userModel