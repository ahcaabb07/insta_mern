const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const singupMiddle = require("../middlewares/singupMiddle");
const loginMiddle = require("../middlewares/loginMiddle");
const authorization = require("../middlewares/authorization");
// @GET bring all users
router.get("/users", (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
});

// @POST insert users to db
router.post("/insert", singupMiddle, (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 12).then((hashedPassword) => {
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    newUser
      .save()
      .then((user) => res.status(200).json(user))
      .catch((err) => console.log(err));
  });
});

// @POST    login
router.post("/login", loginMiddle, (req, res) => {
  res.status(200);
});

// @POST    Protected ressource
router.get("/protected", authorization, (req, res) => {
  res.send("You can see our content");
});

// PUT    Update user data\
router.put("/user/:id", async (req, res) => {
  // const { name } = req.body;
  await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    password: req.body.password,
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
