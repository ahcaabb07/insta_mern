const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const authorization = require("../middlewares/authorization");
// @GET     bring created posts
router.get("/posts", (req, res) => {
  Post.find()
    .populate("createdBy", "_id name")
    .then((post) => {
      res.json(post);
    });
});

// @POST    create a post
router.post("/newPost", authorization, (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    res.status(422).json({ err: "All fields are required" });
  } else {
    req.user.title = undefined;
    req.user.password = undefined;
    const newPost = new Post({
      title,
      body,
      createdBy: req.user,
    });
    newPost
      .save()
      .then((post) => res.json(post))
      .catch((err) => res.json(err));
  }
});

router.get("/postedBy", authorization, (req, res) => {
  Post.find({ createdBy: req.user._id })
    .populate("createdBy", "_id name")
    .then((post) => {
      res.json(post);
    })
    .catch((err) => console.log(err));
});
module.exports = router;
