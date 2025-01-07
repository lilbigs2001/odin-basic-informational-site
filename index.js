const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  let path;
  if (req.url === "/") path = "index.html";
  if (req.url === "/about") path = "about.html";

  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(SERVER_ERROR_MESSAGE);
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
    return;
  });
});

if (process.env.NODE_ENV !== "test") {
  server.listen(8080, () =>
    console.log("Server is running on http://localhost:8080"),
  );
}

const SERVER_ERROR_MESSAGE = "Internal Server Error";

module.exports = server;
