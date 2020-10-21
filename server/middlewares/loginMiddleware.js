const User = require('../models/User');
module.exports =  {
    loginMiddleware : (req, res, next) => {
    const {email , password} = req.body;
    User.findOne({email:email}).then(userHas => {
        !userHas ? res.status(404).json({err:'email or password are incorrect!'})
        : userHas.password !== password ?  res.status(404).json({err:'email or password are incorrect!'}) :
        next()
    })
    }
}