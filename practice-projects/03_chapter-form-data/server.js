const http = require("http");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const server = http.createServer((req, res) => {
  const CJ = path.join(__dirname, req.url);

  const MIME_TYPE = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
  };

  if (req.url === "/") {
    const indexFile = path.join(__dirname, "pages", "home.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(indexFile).pipe(res);

  } else if (req.url.startsWith("/public/")) {
    fs.createReadStream(CJ)
      .on("error", (err) => {
        console.log(err);
        res.statusCode = 500;
        res.end("server error");
      })
      .pipe(res);

  } else if (req.url === "/login" && req.method === "POST") {
    let formData = "";
    req
      .on("data", (chunk) => {
        formData += chunk;
      })
      .on("end", () => {
        const body = formData;
        console.log(body);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: true,
            message: "Login successful",
            data: JSON.parse(body),
          }),
        );
      });
      
  } else {
    res.statusCode = 404;
    res.end("page 404");
  }
});

const PORT = 3005;
server.listen(PORT, () => {
  console.log(`server running: http://localhost:${PORT}`);
});
