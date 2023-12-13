const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  published: { type: Boolean, default: false },
});

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
