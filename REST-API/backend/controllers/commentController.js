const asyncHandler = require("express-async-handler");

const Comment = require("../models/commentModel");

exports.createComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.create(req.body);
  res.json(comment);
});

exports.getComments = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;
  const comments = await Comment.find({ postId: postId });
  res.json(comments);
});

exports.getComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(new Error("Comment not found!"));
  }
  res.json(comment);
});

exports.updateComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!comment) {
    return next(new Error("Comment not found"));
  }
  res.json(comment);
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  if (!comment) {
    return next(new Error("Comment not found!"));
  }
  res.json({ message: "Comment deleted!" });
});
