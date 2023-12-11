var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const connectToDatabase = require("./mongoose");
const initializePassport = require("./passport-config");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userRoutes");
var messageRouter = require("./routes/messageRoutes");

var app = express();

connectToDatabase();

initializePassport(passport);

app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated;
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use(usersRouter);
app.use("/send", messageRouter);
app.use("*", (req, res) => {
  res.status(404).send("NotFoundError: Not Found");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", {
    title: "Error",
    message: err,
    err: err,
  });
});

module.exports = app;
