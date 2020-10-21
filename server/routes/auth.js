const express = require('express');
const router = express.Router();
const {signupMiddleware} = require('../middlewares/signupMiddleware');
const {loginMiddleware} = require('../middlewares/loginMiddleware');
const {SECRET} = require('../config/database');

const User = require('../models/User');

// @GET mehod       get all users
router.get('/' , (req ,res) => {
    User.find().then(user => res.json(user));
})

// @POST method     signUp users
router.post('/signup'  ,signupMiddleware , (req , res) => {
    const newUser = new User({
        name:req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    newUser.save().then(user => res.json(user)).catch(err => console.log(err))
})

// // @GET method Protected ressource
// router.get('/protected' , (req,res) => {
//     res.send('hello user');
// })

// @POST method     Login user
router.post('/login' ,loginMiddleware , (req , res) => {
    res.status(200).json({success:true});
})

// @DELETE method     remove user
router.delete('/delete/:_id'  , (req , res) => {
    User
    .findById(req.params)
    .then(user => !user ? res.status(404).json({success:false})
    : user.remove().then(() => res.status(200).json({success:true}))).catch(err => console.log(err))
})
module.exports = router;