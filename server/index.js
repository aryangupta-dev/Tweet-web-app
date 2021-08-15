const express=require("express");
const app=express();
const {Posts,Comments,Users} =require("./models");
const cors=require("cors");
app.use(cors());
app.use(express.json());
const db=require('./models');
const {validateToken}=require("./middlewares/AuthMiddleware")
const bcrypt=require("bcrypt");
const {sign}=require("jsonwebtoken");






//posts database api
app.get("/posts", async function(req,res){
   const listofPosts= await Posts.findAll();
   res.json(listofPosts);
});
app.post("/posts",validateToken, async function(req,res){
    const post=req.body;
    const username=req.user.username;
    post.username=username;
    await Posts.create(post);
    res.json(post);
});
app.get("/posts/byId/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const post = await Posts.findByPk(id);
    
    res.json(post);
  });

  //comments database api
app.post("/comments",validateToken,async  (req,res)=>{
    const comment=req.body;
    const username=req.user.username;
    comment.username=username;
    await Comments.create(comment);
    res.json(comment);
});

app.get("/comments/:postId",async (req,res)=>{
    const postId=req.params.postId;
    const comments=await Comments.findAll({where:{ PostId:postId}});
    res.json(comments);

})

// users database api

app.post("/auth",async (req,res)=>{
    const{username,password,phoneNo}=req.body;
    bcrypt.hash(password,10).then((hash)=>{
        Users.create({
            username:username,
            password:hash,
            phoneNo:phoneNo,
        });
        res.json("Success");

    });
  
});
app.post("/auth/login",async (req,res)=>{
    const{username,password}=req.body;
    const user= await Users.findOne({where:{username:username}});
    if(!user){
        res.json({error:"User not found"});
    }
        bcrypt.compare(password,user.password).then(async(match)=>{
            if(!match){
                res.json({error:"Password is incorrect"});
            }
                
                const accessToken=sign({
                    username:user.username,id:user.id
                },"secret");
                res.json(accessToken);
            
        });
    
});
db.sequelize.sync().then(()=>{
    app.listen(3001,function(){
        console.log("Server is running on port 3001");
    });

});