let express = require("express")
let bcrypt = require("bcrypt")
let jwt = require('jsonwebtoken')
let userModel = require("../model/user.model")
let router = express.Router()

router.post("/sign-up", async (req, res) => {
    try {
        let { username, password } = req.body
        if (username != null && password != null) {
            //checking if the user already exists
            let user = await userModel.findOne({ username })
            if (user) {
                return res.status(401).send({
                    message: "User already exists"
                })
            }
            else {
                let hashedPass = await bcrypt.hash(password, 10)
                await userModel.create({
                    username,
                    password: hashedPass
                })
                return res.status(201).send({
                    message: "User registered successfully"
                })
            }

        }
        else {
            res.status(401).send({
                message: "Incomplete Credentials"
            })
        }
    }
    catch (err) {
        console.log("Error: " + err)
        res.status(500).send({
            message: "Error " + err
        })
    }
})


router.post("/login", async (req, res) => {
    try {
        let { username, password } = req.body
        if (username != null && password != null) {
            let user = await userModel.findOne({ username })
            if (!user) {
                return res.status(404).send({ message: "User not found" })
            }
            let isValidUser = await bcrypt.compare(password, user.password)
            if (isValidUser) {
                let token = await jwt.sign({ id : user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
                return res.status(201).send({
                    message: "Login successful",
                    token: token
                })
            }
            else {
                res.status(401).send({
                    message: "Incorrect credentials"
                })
            }
        }
        else {
            return res.status(401).send({
                message: "Incomplete credentials"
            })
        }
    }
    catch (err) {
        console.log("Error: " + err)
        res.status(500).send({
            message: "Error " + err
        })
    }
})

module.exports = router