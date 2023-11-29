var http = require("http");
var fs = require("fs");
var url = require("url");

http
  .createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "htmls" + q.pathname;

    console.log(filename);

    switch (filename) {
      case "htmls/":
        fs.readFile("htmls/index.html", function (err, data) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
        });
        break;
      case "htmls/about.html":
        fs.readFile(filename, function (err, data) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
        });
        break;
      case "htmls/contact-me.html":
        fs.readFile(filename, function (err, data) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
        });
        break;
      default:
        fs.readFile("htmls/404.html", function (err, data) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
        });
        break;
    }
  })
  .listen(8080);
