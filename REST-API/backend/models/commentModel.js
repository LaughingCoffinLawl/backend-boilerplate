const mongoose = require("mongoose");

const commentScherma = new mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentScherma);

module.exports = Comment;
