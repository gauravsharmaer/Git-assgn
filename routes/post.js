const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin=require("../middleware/requireLogin");
const { populate } = require("../models/Usermodel");
const Post=mongoose.model("Post")

//get all posts//
router.get("/allpost",(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .then((posts)=>{
        res.json({posts})
    })
    .catch((error)=>{
        console.log(error)
    })
}) 


//craete a post//(
    router.post("/createpost",requireLogin,(req,res)=>{
        const {title,body}=req.body
        if(!title||!body){
          return  res.status(422).json({error:"please add all the fields"})
        }
        req.user.password=undefined
        const post=new Post({
           title,body,postedBy:req.user
        })
        post.save()
        .then((result)=>{
            res.json({post:result})
        }).catch((error)=>{
               console.log(error)
        })
    })


    //delete a post//
    router.delete("/deletepost/:id",requireLogin, async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({ error: "incorrect id" });
        }
        const post =await Post.findOneAndDelete({ _id: id }, { ...req.body });
        if (!post) {
          return res.status(404).json({ error: "no such post" });
        }
        res.status(200).json(post);

    })



    //update a post //
router.put("/updatepost/:id",requireLogin, async(req,res)=>{
    const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({ error: "incorrect id" });
        }
        const post =await Post.findOneAndUpdate({ _id: id }, { ...req.body },{new:true,runvalidators:true});
        if (!post) {
          return res.status(404).json({ error: "no such post" });
        }
        res.status(200).json(post);

})





    module.exports=router