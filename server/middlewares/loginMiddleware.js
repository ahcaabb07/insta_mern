const User = require('../models/User');
const {SECRET} = require('../config/database');
const jwt = require('jsonwebtoken');
module.exports =  (req, res, next) => {
    const {email , password} = req.body;
    User.findOne({email:email}).then(userHas => {
        !userHas ? res.status(404).json({err:'Email is incorrect!'})
        : userHas.password !== password ?  res.status(404).json({err:'Password is incorrect!'})
        : token = jwt.sign({_id:userHas._id} , SECRET)        
        next();
    })
    }