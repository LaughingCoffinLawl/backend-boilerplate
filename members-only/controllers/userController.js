const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../modules/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const saltRounds = 10;

exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render("login", {
    title: "Login",
    messages: req.flash("error"),
  });
});

exports.user_login_post = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      console.log(info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

exports.user_signup_get = asyncHandler(async (req, res, next) => {
  res.render("signup", { title: "Signup" });
});

exports.user_signup_post = [
  body("first_name", "The name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("last_name", "The last name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("username", "Please enter a validate email").isEmail().normalizeEmail(),
  body("password", "Password is required.")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain a number."),
  body("conpassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords don't match");
    }
    return true;
  }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      const myUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hashedPassword,
      });
      const userExists = await User.findOne({
        username: req.body.username,
      }).exec();
      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }
      console.log(userExists);
      await myUser.save();
      res.redirect("/");
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Server error" });
    }
  }),
];

exports.user_logout_post = (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
      }
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });
};

exports.user_vip_get = asyncHandler(async (req, res, next) => {
  res.render("vip", { title: "VIP" });
});

exports.user_vip_post = asyncHandler(async (req, res, next) => {
  const myUser = await User.findById(req.user.id);
  console.log(myUser);
  const passcode = process.env.PASSCODE;
  if (req.body.passcode === passcode) {
    myUser.member_ship = "in";
    await myUser.save();
    res.redirect("/");
  } else {
    console.log("Nope");
  }
});

exports.user_admin_get = asyncHandler(async (req, res, next) => {
  res.render("admin", { title: "Admin Panel" });
});

exports.user_admin_post = asyncHandler(async (req, res, next) => {
  const myUser = await User.findById(req.user.id);
  console.log(myUser);
  const adminpass = process.env.ADMIN_PASSCODE;
  if (req.body.adminpass === adminpass) {
    myUser.member_ship = "admin";
    await myUser.save();
    res.redirect("/");
  } else {
    console.log("Nope");
  }
});
