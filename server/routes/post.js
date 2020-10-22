const express = require('express');
const router = express.Router();
const {createPostMiddleware} = require('../middlewares/createPostMiddleware');
const Post = require('../models/Post');

// @POST method     create a post
router.post('/create' , createPostMiddleware  , (req , res) => {
const newPost = new Post({
    title:req.body.title,
    body:req.body.body
});
newPost.save().then(post => res.json(post)).catch(err => console.log(err))
})
module.exports = router