const jwt = require('jsonwebtoken');
const hash = require('bcryptjs');
const User = require('../models/User');
const {SECRET} = require('../config/database');
const bcrypt = require('bcryptjs/dist/bcrypt');
module.exports =  (req, res, next) => {
    const {email , password} = req.body;
    User.findOne({email:email}).then(userHas => {
        !userHas ? res.status(404).json({err:'Email is incorrect!'})
        : bcrypt.compare(password , userHas.password).then((match) => {
            if(!match){
                res.status(404).json({err:'Password is incorrect!'})
            }else{
                token = jwt.sign({_id:userHas._id} , SECRET)        
                next();
            }
        }) 
    })
    }