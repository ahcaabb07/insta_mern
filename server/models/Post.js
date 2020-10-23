const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;
const postSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default: "nothing to see here",
  },
  createdBy: {
    type: ObjectId,
    ref: "User",
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Post", postSchema);
