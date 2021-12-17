const express = require("express")
const jwt = require("jsonwebtoken")

const app = express()


app.get("/api", (req, res) => {
    res.json({ message: "Welcome" })
})


app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", { expiresIn: "30s" }, (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: "Post created",
                authData
            })
        }
    })

})


app.post("/api/login", (req, res) => {
    //create user
    const user = {
        id: 1,
        username: "giorgos",
        email: "giorgos@gmail.com"
    }
    jwt.sign({ user }, "secretkey", (err, token) => {
        res.json({
            token
        })
    })

})




//verify token
function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers["authorization"]
    //check of bearer is undefined
    if (typeof bearerHeader !== "undefined") {
        //split
        const bearer = bearerHeader.split(" ")
        //get token from array
        const bearerToken = bearer[1]
        //set token
        req.token = bearerToken
        next()

    } else {
        //Forbidden
        res.sendStatus(403)
    }
}

app.listen(5000, () => console.log("server started"))