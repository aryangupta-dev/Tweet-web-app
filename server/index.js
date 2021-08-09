const express=require("express");
const app=express();
const {Posts,Comments} =require("./models");
const cors=require("cors");
app.use(cors());
app.use(express.json());
const db=require('./models');





//posts database api
app.get("/posts", async function(req,res){
   const listofPosts= await Posts.findAll();
   res.json(listofPosts);
});
app.post("/posts",async function(req,res){
    const post=req.body;
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
app.post("/comments",async  (req,res)=>{
    const comment=req.body;
    await Comments.create(comment);
    res.json(comment);
});

app.get("/comments/:postId",async (req,res)=>{
    const postId=req.params.postId;
    const comments=await Comments.findAll({where:{ PostId:postId}});
    res.json(comments);

})
db.sequelize.sync().then(()=>{
    app.listen(3001,function(){
        console.log("Server is running on port 3001");
    });

});