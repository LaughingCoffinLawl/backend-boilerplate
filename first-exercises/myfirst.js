var http = require("http");
//import external modules
var dt = require("./myfirstmodule");
var url = require("url");
//read files
var fs = require("fs");

/*http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("The date and time are currently: " + dt.myDateTime());
    //return the url
    res.write(req.url);
    //split query string in he url
    var q = url.parse(req.url, true).query;
    //get month and year from the url = http://localhost:8080/?year=2017&month=July
    var txt = q.year + " " + q.month;
    res.end("Hello World!    " + txt);
  })
  .listen(8080);*/

//read and show the files html on http://localhost:8080/
/*
http
  .createServer(function (req, res) {
    fs.readFile("index.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080); */

http
  .createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;

    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "test/html" });
        return res.end("404 not found");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  })
  .listen(8080);
