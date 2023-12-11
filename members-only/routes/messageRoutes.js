var express = require("express");
var messageRouter = express.Router();

// Required controllers
const messages_controller = require("../controllers/messageController");

module.exports = messageRouter;
