const { JsonWebTokenError } = require("jsonwebtoken");
const { SECRET } = require("../config/database");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  !authorization
    ? res.status(402).json({ err: "you must logged in first" })
    : (token = authorization.replace("Bearer ", ""));
  jwt.verify(token, SECRET, (err, payload) => {
    if (err) {
      res.status(422).json(err);
    } else {
      const { _id } = payload;
      User.findOne({ _id: _id }).then((user) => {
        req.user = user;
        next();
      });
    }
  });
};
