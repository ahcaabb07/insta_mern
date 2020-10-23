const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/database");
module.exports = (req, res, next) => {
  const { email, password } = req.body;
  !email || !password
    ? res.status(422).json({ err: "email, password are required" })
    : User.findOne({ email: email }).then((user) => {
        !user
          ? res.status(402).json({ err: "email is incorrect" })
          : bcrypt.compare(password, user.password).then((userPassword) => {
              if (!userPassword) {
                res.status(402).json({ err: "password is incorrect" });
              } else {
                const token = jwt.sign({ _id: user._id }, SECRET);
                res.status(200).json({ token });
                next();
              }
            });
      });
};
