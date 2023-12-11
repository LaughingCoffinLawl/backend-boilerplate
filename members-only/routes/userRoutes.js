var express = require("express");
var userRouter = express.Router();

// Required controllers
const users_controller = require("../controllers/userController");

userRouter.get("/login", users_controller.user_login_get);
userRouter.post("/login", users_controller.user_login_post);
userRouter.get("/signup", users_controller.user_signup_get);
userRouter.post("/signup", users_controller.user_signup_post);
userRouter.get("/logout", users_controller.user_logout_post);

module.exports = userRouter;
