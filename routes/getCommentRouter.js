const express = require("express")
const getCommentRouter = express.Router()
const Comment = require("../models/comment")

getCommentRouter.get("/:postId", (req, res, next) => {
    Comment.find({postId: req.params.postId}, (err, comment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comment)
    })
})

module.exports = getCommentRouter