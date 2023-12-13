var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/indexRoutes");
var usersRouter = require("./routes/usersRoutes");
var postRouter = require("./routes/postsRoutes");
var commentRouter = require("./routes/commentsRoutes");

const connectToDatabase = require("./mongoose");
const cors = require("cors");

var app = express();

connectToDatabase();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send the error as JSON
  res.status(err.status || 500);
  res.json({
    title: "Error",
    message: err.message,
    error: err,
  });
});

module.exports = app;
