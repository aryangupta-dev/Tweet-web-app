const express = require("express");
const app = express();
const { Posts, Comments, Users, Likes } = require("./models");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const db = require("./models");
const { validateToken } = require("./middlewares/AuthMiddleware");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
require("dotenv").config();

//posts database api
app.get("/posts", validateToken, async function (req, res) {
  const listofPosts = await Posts.findAll({ include: [Likes] });
  res.json(listofPosts);
});
app.post("/posts", validateToken, async function (req, res) {
  const post = req.body;
  const userId = req.user.id;
  const username = req.user.username;
  post.UserId = userId;
  post.username = username;
  await Posts.create(post);
  res.json(post);
});
app.get("/posts/byId/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const post = await Posts.findByPk(id);

  res.json(post);
});
// delete post
app.delete("/deletepost/:id", async function (req, res) {
  const postId = req.params.id;
  const post = await Posts.destroy({ where: { id: postId } });
  await Comments.destroy({ where: { PostId: postId } });
  await Likes.destroy({ where: { PostId: postId } });
  res.json(post);
});
//your posts
app.get("/userposts/:id", validateToken, async function (req, res) {
  const userId = req.params.id;
  console.log(userId);
  const listofPosts = await Posts.findAll({
    where: { UserId: userId },
    include: [Likes],
  });

  res.json(listofPosts);
});

//comments database api
app.post("/comments", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  await Comments.create(comment);
  res.json(comment);
});

app.get("/comments/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});
app.delete("/comments/:id", async (req, res) => {
  const commentId = req.params.id;
  console.log(commentId);
  await Comments.destroy({ where: { id: commentId } });

  res.json("DELETED SUCCESSFULLY");
});

// users database api

app.post("/auth", async (req, res) => {
  const { username, password, phoneNo } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      phoneNo: phoneNo,
    });
    res.json("Success");
  });
});
app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    res.json({ error: "User not found" });
  }
  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) {
      res.json({ error: "Password is incorrect" });
    }

    const accessToken = sign(
      {
        username: user.username,
        id: user.id,
      },
      "secret"
    );
    res.json(accessToken);
  });
});

app.put("/changepassword", validateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  console.log(req.body);
  const user = await Users.findOne({ where: { username: req.user.username } });
  bcrypt.compare(currentPassword, user.password).then(async (match) => {
    if (!match) {
      res.json({ error: "Password is incorrect" });
    }
    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
      res.json("Success");
    });
  });
});

//header username
app.get("/username", validateToken, async (req, res) => {
  const userName = req.body;
  const username = req.user.username;
  userName.username = username;
  res.json(userName);
});
app.get("/userId", validateToken, async (req, res) => {
  const userId = req.user.id;

  res.json(userId);
});
//profile
app.get("/profile", validateToken, async (req, res) => {
  const username = req.user.username;
  const user = await Users.findOne({ where: { username: username } });

  res.json(user);
});
// likes api
app.post("/likes", validateToken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;
  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });
  if (!found) {
    await Likes.create({ PostId: PostId, UserId: UserId });
    res.json({ liked: true });
  } else {
    await Likes.destroy({ where: { PostId: PostId, UserId: UserId } });
    res.json({ liked: false });
  }
});

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT||3001, function () {
    console.log("Server is running on port 3001");
  });
}).catch((err)=>{
  console.log(err);
});
