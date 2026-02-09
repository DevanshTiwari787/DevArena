let mongoose = require('mongoose')
let Schema  = mongoose.Schema

let postSchema = new Schema({
    content : {
        type: String,
        required : true,
        trim : true
    },
    likes : {
        type : Number,
        default : 0,
    }
},{
    timestamps : true
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post