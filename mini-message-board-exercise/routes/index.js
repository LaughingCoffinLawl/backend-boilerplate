var express = require("express");
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

/* GET home page. */
/* router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", message: "This is the homepage" });
}); */

/* GET the /new page. */
router.get("/new", function (req, res, next) {
  res.render("form", { title: "This is the /new page" });
});

router.post("/new", function (req, res, next) {
  const messageText = req.body.message;
  const messageUser = req.body.author;
  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date(),
  });
  res.redirect("/");
});

router.get("/", function (req, res, next) {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

module.exports = router;
