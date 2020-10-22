const {SECRET} = require('../config/database')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    !authorization ? res.status(502).json({err:'Please login first'})
    : token = authorization.replace('Bearer ', '')
    jwt.verify(token , SECRET , (err , payload) => {
        if(err) { res.status(401).json({err:"Please login first"})
        }else{
            const {_id} = payload
            User.findById(_id).then(userData => {
            req.user = userData
             console.log(req.user)
            next()
        })
    }
    })
}