const express = require('express');
const hash = require('bcryptjs');
const router = express.Router();
const signupMiddleware = require('../middlewares/signupMiddleware');
const loginMiddleware = require('../middlewares/loginMiddleware');
const authorization = require('../middlewares/authorization');
const User = require('../models/User');

// @GET mehod       @get all users
router.get('/' , (req ,res) => {
    User.find().then(user => res.json(user));
})

// @POST method     @signUp users
router.post('/signup'  ,signupMiddleware , (req , res) => {
    const {name, email, password} = req.body
    // Hash The password
    bcrypt.hash(password , 12).then(hashePassword => {
        const newUser = new User({
        name,
        email,
        password:hashePassword
    })
    newUser.save().then(user => res.json(user)).catch(err => console.log(err))
    })
})

// @POST method     @Login user
router.post('/login' ,loginMiddleware , (req , res) => {
    res.json({token:token});
    
})

// @GET method      @get a protected ressource
router.get('/protected', authorization , (req, res) => {
    res.status(200).json({msg:"you can reach the protecetd content now"})
})

// @DELETE method     @remove user
router.delete('/delete/:_id'  , (req , res) => {
    User
    .findById(req.params)
    .then(user => !user ? res.status(404).json({success:false})
    : user.remove().then(() => res.status(200).json({success:true}))).catch(err => console.log(err))
})
module.exports = router;