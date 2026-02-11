let express = require("express")
let userModel = require("../model/user.model")
let router = express.Router()

//get all users
router.get('/', async (req, res) => {
    try {
        let users = await userModel.find({})
        if (users.length > 0) {
            return res.status(200).send(users)
        }
        res.status(404).send({
            message: "No users found"
        })
    }
    catch (err) {
        console.log("Error: " + err)
        res.status(500).send({
            message: "Error " + err
        })
    }
})

//get user by id
router.get('/:id', async (req, res) => {
    try {
        let user = await userModel.findById(req.params.id)
        if (!user) {
            return res.status(400).send({
                message: "No user of the given id available"
            })
        }
        res.status(200).send({
            message: "User fetched",
            user
        })
    }
    catch (err) {
        console.log("Error: " + err)
        res.status(500).send({
            message: "Error " + err
        })
    }
})


module.exports = router