const User = require("../models/User");

module.exports = (req ,res ,next) =>  {
        const {name , email , password} = req.body;
        !name || !email || !password ? res.status(422).json({err:'name, email or password are empty!'})
        : User.findOne({email:email}).then(userHas => {
            userHas ? res.status(422).json({err:'email already existe'}) : next()
        })
    }