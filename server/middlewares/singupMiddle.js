const User = require("../models/User");
module.exports = (req, res, next) => {
  const { name, email, password } = req.body;
  !name || !email || !password
    ? res.status(422).json({ err: "name, email, password are required" })
    : User.findOne({ email: email }).then((user) => {
        user ? res.status(404).json({ err: "email already exist" }) : next();
      });
};
