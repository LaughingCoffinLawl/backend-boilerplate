var express = require("express");
var userRouter = express.Router();

// Required controllers
const users_controller = require("../controllers/userController");

userRouter.get("/login", users_controller.user_login_get);
userRouter.post("/login", users_controller.user_login_post);
userRouter.get("/signup", users_controller.user_signup_get);
userRouter.post("/signup", users_controller.user_signup_post);
userRouter.get("/logout", users_controller.user_logout_post);
userRouter.get("/vip", users_controller.user_vip_get);
userRouter.post("/vip", users_controller.user_vip_post);
userRouter.get("/admin", users_controller.user_admin_get);
userRouter.post("/admin", users_controller.user_admin_post);

module.exports = userRouter;
