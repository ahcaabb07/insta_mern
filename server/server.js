const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const cors = require("cors");
const PORT = process.env.PORT || 7000;
const { DB_URL } = require("./config/database");
const auth = require("./routes/auth");
const posts = require("./routes/post");
const app = express();

// @Database connection
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected successfuly"))
  .catch((err) => console.log(err));

// @app uses
app.use(bodyParser.json());
// app.use(cors);
app.use(auth);
app.use(posts);
// @server running on
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
