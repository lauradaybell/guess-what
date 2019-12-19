const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema ({
    created: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    commentText: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Comment", commentSchema)