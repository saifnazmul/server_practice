const fs = require("fs");
const path = require('path')
const http = require("http");
const crypto = require("crypto");
const { buffer } = require("stream/consumers");

const server= http.createServer((req,res)=>{
  console.log(req.url);

  const algorithm = "aes-256-cbc"
  const key = Buffer.from("12535465455454575125354654554545")
  const iv =  Buffer.from("mycode0123456789")

  const cipher = crypto.createCipheriv(algorithm,key,iv);
  let encrypted = cipher.update('hollo saif','utf8','hex');
  encrypted += cipher.final('hex')
  console.log("key:",key)
  console.log("iv",iv)

//  fs.createReadStream("data.txt")
  // .pipe(cipher)
  // .on("data", chunk => {
    // saveChunk(chunk); // DB / file
  // });



  if(req.url === "/"){
    // console.log(algorithm)
    const decipher = crypto.createDecipheriv(algorithm,key,iv);
    let decrypted = decipher.update(encrypted,'hex','utf8');
    decrypted += decipher.final('utf8')
     console.log("encode: ",decrypted)
    res.write("<h1>home page</h1>")
    res.end()
  }



})




server.listen(3000,()=>{
  console.log("server running")
})