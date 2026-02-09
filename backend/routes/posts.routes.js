const express = require("express")
const router = express.Router();
const posts = [];
//get all posts
router.get("/", (req,res)=>{
    res.send(posts)
})


//get all posts by id
router.get("/:id", (req,res)=>{
    const id = req.params.id;
    let post = posts.find((obj)=> obj.id === parseInt(id));
    if(!post){
        res.status(404).send({
            message : "Post Not Found"
        })
    }
    else{
        res.status(200).send(post)
    }
})

//make a post
router.post("/" , (req,res)=>{
    let post = req.body;
    console.log(post)
    if(!post || !post.message){
        res.status(400).send({
            message : "No post received"
        })
    }
    else{
        let newPost = {id: Date.now() , ...req.body}
        posts.push(newPost)
        console.log(posts)
        res.status(201).send(newPost)
    }
})

//delete a post
router.delete("/:id", (req,res)=>{
    let id = req.params.id;
    if(id){
        let idx = posts.findIndex((obj)=> obj.id === parseInt(id))
        console.log(idx)
        if(idx == -1){
            res.status(404).send({
                message : "This post doesnt exists"
            })
        }
        else{
            posts.splice(idx,1);
            console.log(posts)
            res.status(200).send({
                message : "Post Deleted Successfully"
            })
        }
    }
    else{
        res.status(401).send({
            message : "No id provided"
        })
    }
})

module.exports = router