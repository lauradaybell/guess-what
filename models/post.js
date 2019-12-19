const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema ({

    image: {
        type:String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    created: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    taggedUser: String,
    username: {
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model("Post", postSchema)