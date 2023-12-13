var express = require("express");
var router = express.Router();
const commentController = require("../controllers/commentController");

/* Post Routes */

module.exports = () => {
  router.post("/", commentController.createComment);
  router.get("/:id", commentController.getComment);
  router.put("/:id", commentController.updateComment);
  router.delete("/:id", commentController.deleteComment);
};
