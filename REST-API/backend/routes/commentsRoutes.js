var express = require("express");
var router = express.Router();
const commentController = require("../controllers/commentController");

/* Post Routes */

router.post("/", commentController.createComment);
router.get("/:id", commentController.getComment);
router.get("/post/:postId", commentController.getComments);
router.put("/:id", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);

module.exports = router;
