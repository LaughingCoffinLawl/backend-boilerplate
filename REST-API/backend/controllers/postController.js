const asyncHandler = require("express-async-handler");

const Post = require("../models/postModel");

exports.createPost = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const post = await Post.create(req.body);
  res.json(post);
});

exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();
  res.json(posts);
});

exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new Error("Post not found"));
  }
  res.json(post);
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!post) {
    return next(new Error("Post not found"));
  }
  res.json(post);
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return next(new Error("Post not found"));
  }
  res.json({ message: "Post deleted" });
});
