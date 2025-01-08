const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const { filePath, is404 } = resolveFilePath(req.url);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(SERVER_ERROR_MESSAGE);
      return;
    }
    res.writeHead(is404 ? 404 : 200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    res.end(data);
    return;
  });
});

if (process.env.NODE_ENV !== "test") {
  server.listen(8080, () =>
    console.log("Server is running on http://localhost:8080"),
  );
}

const resolveFilePath = (url) => {
  const urlToFileMap = {
    "/": "index.html",
    "/about": "about.html",
    "/contact-me": "contact-me.html",
  };

  const fileName = urlToFileMap[url] || "404.html";
  const is404 = !urlToFileMap[url];
  const filePath = path.join(PUBLIC_DIR, fileName);

  return { filePath, is404 };
};

const SERVER_ERROR_MESSAGE = "Internal Server Error";
const PUBLIC_DIR = "public";

module.exports = { server, SERVER_ERROR_MESSAGE };
