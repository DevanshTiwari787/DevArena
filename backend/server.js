let express = require("express");
const postRouter = require("./routes/posts.routes")
let app = express()

app.use(express.json())
app.use("/posts", postRouter)

app.get("/status", (req,res)=>{
    res.send({
        status : "online"
    })
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})
/*
app.post("/posts" , (req,res)=>{
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

app.get("/posts/:id", (req,res)=>{
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

app.delete("/posts/:id", (req,res)=>{
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

app.get("/posts"  , (req,res)=>{
    res.send(posts)
})

*/
