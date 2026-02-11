const express = require("express")
let authMiddleware = require("../middleware/auth.middleware")

const router = express.Router();
let postModel = require("../model/post.model")

//get all posts
router.get("/", async (req, res) => {
    try {
        let posts = await postModel.find({}).populate("user", "username");
        if (posts.length > 0) {
            res.status(200).send(posts)
        }
        else {
            res.status(404).send({
                message: "No posts found"
            })
        }
    }
    catch (err) {
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
})

//get post by id
router.get("/:id", async (req, res) => {
    try {
        let id = req.params.id
        let post = await postModel.findById(id).populate("user", "username")
        if(!post){
            res.status(404).send({
                message : "No post found"
            })
        }
        else{
            res.status(200).send(post)
        }
    }
    catch (err) {
        console.log("Internal server error: " + err)
        res.status(500).send({
            err
        })
    }

})

//make a post
router.post("/", authMiddleware, async (req, res) => {
    try {
        let content = req.body.content
        if (content) {
            let post = await postModel.create({
                content: content,
                user : req.userId
            })
            res.status(201).send({
                message: "Post created successfully",
                post: post
            })
        }
        else {
            res.status(400).send({
                message: "Content not provided"
            })
        }
    }
    catch (err) {
        console.log("Error: " + err)
        res.status(500).send(err)
    }

})

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        let id = req.params.id
        //we need to check whether the post belongs to the same user or no
        let postCheck = await postModel.findById(id).populate("user", "_id");
        if (!postCheck) {
            return res.status(404).send({
                messaege: "No post found"
            })
        }
        if (postCheck.user._id.toString() != req.userId) {
            return res.status(401).send({
                message: "Unauthorized access"
            })
        }
        let post = await postModel.findByIdAndDelete(id);
        res.status(200).send({
            message: "Post Deleted Successfully",
            postDeleted: post
        })

    }
    catch (err) {
        console.log("Error: " + err)
        res.status(500).send(err)
    }
})


//update a post
router.patch("/:id",authMiddleware, async (req,res) =>{
    try{
        let id = req.params.id
        let content = req.body.content
        if (id != null && content) {
            let post = await postModel.findByIdAndUpdate(
                id,
                {
                    content : content
                },
                {
                    new : true
                }
            )
            if(!post){
                res.status(404).send({
                    message : "No post found"
                })
            }
            else{
                res.status(200).send({
                    message : "Post Updated Successfully",
                    post : post
                })
            }
        }
        else{
            res.status(400).send({
                message : "Input error"
            })
        }
    }
    catch (err) {
        console.log("Error: " + err)
        res.status(500).send(err)
    }
})

module.exports = router