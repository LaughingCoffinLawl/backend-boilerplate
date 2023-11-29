const express = require("express");
const app = express();
const port = 8080;

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use(express.static("htmls"));

// Catch-all route for handling undefined routes
app.use(function (req, res, next) {
  console.error(`404 Error: ${req.url}`);
  res.redirect("/404.html"); // Redirect to the "/error" page
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
