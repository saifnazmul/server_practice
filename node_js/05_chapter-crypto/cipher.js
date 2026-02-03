const fs = require("fs");
const path = require("path");
const http = require("http");
const crypto = require("crypto");

const server = http.createServer((req, res) => {
  console.log(req.url);

  const algorithm = "aes-256-cbc";
  const key = Buffer.from("12535465455454575125354654554545");
  const iv = Buffer.from("mycode0123456789");

  const dataText = fs.createReadStream(path.join(__dirname, "data.txt"));
  //
  // const cipher = crypto.createCipheriv(algorithm,key,iv);
  // dataText
  // .pipe(cipher)
  // .pipe(fs.createWriteStream(path.join(__dirname,"encrypt.txt")))



  
  // const chunks = []
  // dataText
  // .pipe(cipher)
  // .on("data",(chunk)=>{
  // chunks.push(chunk)
  // })
  // .on("end",()=>{
  // console.log('buffer: ',chunks)
  // const encrypted = Buffer.concat(chunks).toString('hex')
  // console.log("B+hex: ",encrypted)
  // const stremWrite =  fs.createWriteStream(path.join(__dirname,'encrypted.txt'));
  // stremWrite.write(encrypted)
  // })

  if (req.url === "/home") {
    const encreyptChunk = [];
    // const dataBasehex = '9d547fd17e1a41b1b9fad3c6ff7fe852'

    //  const decipher = crypto.createDecipheriv(algorithm,key,iv);
    //  let decrypt = decipher.update(dataBasehex,'hex','utf8');
    //  decrypt += decipher.final('utf8')
    //  console.log("hoho",decrypt)

    const readEncrypt = fs.createReadStream(
      path.join(__dirname, "encrypt.txt"),
    );
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    readEncrypt
      .pipe(decipher)
      .on("data", (chunk) => {
        encreyptChunk.push(chunk);
      })
      .on("end", () => {
        console.log("encreypt:", Buffer.concat(encreyptChunk).toString());
      });

    res.write("<h1>home page</h1>");
    res.end();
  } else if (req.url === "/short") {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    dataText
      .pipe(cipher)
      .pipe(fs.createWriteStream(path.join(__dirname, "encrypt.txt")));

    res.write("<h1>page</h1>");
    res.end();
  } else {
    res.end();
  }
});

server.listen(3000, () => {
  console.log("server running");
});
