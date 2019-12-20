const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require("path")
require("dotenv").config()
const expressJwt = require('express-jwt')
const PORT = process.env.PORT || 7000
const secret = process.env.SECRET || "trout smashed oak tortoise"

app.use(express.json())
app.use(morgan('dev'))
    app.use(express.static(path.join(__dirname, 'client', 'build')))


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/guessWhat', 
    {
        useNewUrlParser:true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    }, () => console.log('Connected to MongoDB'))


    
// routes
    app.use("/auth", require("./routes/authRouter"))
    app.use("/api", expressJwt({secret: secret}))
    app.use("/api/post", require("./routes/postRouter"))
    app.use("/api/comment", require("./routes/commentRouter"))
    app.use("/comment", require("./routes/getCommentRouter"))


// Error handler
    app.use((err, req, res, next) => {
        if(err.name === "UnauthorizedError"){
            res.status(err.status)
        }
        return res.send({errMsg: err.message})
    })
    
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });

    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })