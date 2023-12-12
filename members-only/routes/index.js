var express = require("express");
const asyncHandler = require("express-async-handler");
var router = express.Router();
const Message = require("../modules/messages");
const User = require("../modules/user");
const { body, validationResult } = require("express-validator");
const { DateTime } = require("luxon");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const [myMessages, myUsers] = await Promise.all([
    Message.find().sort({ date: 1 }).exec(),
    User.find().exec(),
  ]);
  res.render("index", {
    title: "Home Page",
    messages: myMessages,
    user: req.user,
    users: myUsers,
    isAuthenticated: req.isAuthenticated(),
    DateTime: DateTime,
  });
});

router.post(
  "/",
  body("message", "Insert at least a character")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const myMessage = new Message({
        author: req.user.first_name + " " + req.user.last_name,
        message: req.body.message,
        date: Date.now(),
      });
      await myMessage.save();
      res.redirect("/");
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Server error" });
    }
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    try {
      const message = await Message.findById(req.params.id);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      await Message.deleteOne({ _id: req.params.id });
      res.json({ success: true });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Server error" });
    }
  })
);

module.exports = router;
