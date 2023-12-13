var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

/* User Routes */
module.exports = () => {
  router.post("/", userController.createUser);
  router.get("/:id", userController.getUser);
  router.put("/:id", userController.updateUser);
  router.delete("/:id", userController.deleteUser);
};
