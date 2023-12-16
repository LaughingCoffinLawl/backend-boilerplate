const mongoose = require("mongoose");

const commentScherma = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  postId: { type: String, required: true },
});

const Comment = mongoose.model("Comment", commentScherma);

module.exports = Comment;
