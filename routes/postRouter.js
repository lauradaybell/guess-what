const express = require('express')
const postRouter = express.Router()
const Post = require("../models/post")

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

postRouter.get("/", (req, res, next) => {
    Post.find((err, posts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(posts)
    })
})

postRouter.get("/user", (req, res, next) => {
    Post.find({user: req.user._id}, (err, usersPosts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(usersPosts)
    })
})



postRouter.post("/", (req, res, next) => {
    req.body.user= req.user._id
    const newPost = new Post(req.body)

    newPost.user = req.user._id
    newPost.created = formatDate(new Date())
    newPost.username = req.user.username
    
    
    newPost.save((err, savedPost) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedPost)
    })
})

postRouter.route("/:_id")
    .delete((req, res, next) => {
        Post.findByIdAndRemove({_id: req.params._id, user: req.user._id}, (err, post) => {
            if(err){
                res.status(500)
                return next(err)
            }
            const response = {
                message: "Post successfully deleted",
                id: post._id
            }
            return res.status(200).send(response)
        })
    })
    .put((req, res, next) => {
        Post.findByIdAndUpdate({_id: req.params._id, user: req}, req.body, {new:true}, (err, post) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(post)
        })
    })
    
    


module.exports = postRouter