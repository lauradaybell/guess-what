const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment')


const formatDate = (date) => {
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let morning

    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    if (hours < 13) {
        morning = "A.M."
    } else {
        morning = "P.M."
        hours -= 12
    }

    return `${hours}:${minutes} ${morning} UTC, ${day} ${monthNames[monthIndex]} ${year}`
}

commentRouter.route("/:id")
    .delete((req, res, next) => {
        Comment.findByIdAndRemove(req.params._id, (err, comment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            const response = {
                message: "Comment successfully deleted",
                id: comment._id
            }
            return res.status(200).send(response)
        })
    })
    .put((req, res, next) => {
        Comment.findByIdAndUpdate(req.params._id, req.body, {new:true}, (err, comment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(comment)
        })
    })
    .post((req, res, next) => {
        const newComment = new Comment(req.body)

    newComment.user = req.user._id
    newComment.postId = req.params.id
    newComment.username = req.user.username 
    newComment.created = formatDate(new Date())

    newComment.save((err, newComment) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(newComment)
    })
    })

commentRouter.get("/", (req, res, next) =>{
        Comment.find((err, comment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comment)
    })
})



module.exports = commentRouter
