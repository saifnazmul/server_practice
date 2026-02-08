const http = require('http');
const path = require('path');
const fs = require('fs')
const crypto = require('crypto')

const server = http.createServer((req,res)=>{
  const filepath = path.join(__dirname,'test.txt')
  //------------- file read & write------------
//  fs.createReadStream(filepath).pipe(res);
 
//  fs.createReadStream(filepath)
//  .pipe(fs.createWriteStream(path.join(__dirname,'output.txt')));

// -----------------crypto ------------------
 const algorithm = "aes-256-cbc"; //aes-256-gcm
  const key = Buffer.from("12535465455454575125354654554545");
  const iv = Buffer.from("mycode0123456789");
 
 const readFile = fs.createReadStream(filepath);

 const chunkCipher = []
 const cipher =crypto.createCipheriv(algorithm,key,iv)
 readFile
 .pipe(cipher)
 .on('data',(chunk)=>{
   chunkCipher.push(chunk);
 })
 .on('end',()=>{
  const encrypted = Buffer.concat(chunkCipher).toString('hex') // 30414837cade18af5deb2443c6d266de
  // console.log(encrypted)
  res.end()
 })

//  decrypt data logic=============
const encryptedData  = '30414837cade18af5deb2443c6d266de'
const deCipher = crypto.createDecipheriv(algorithm,key,iv)
let decrypt = deCipher.update(encryptedData,'hex','utf8');
decrypt += deCipher.final('utf8')
console.log('decryptData:',decrypt)




})


const PORT = 3007
server.listen(PORT,()=>{
  console.log(`server running: http://localhost:${PORT}`)
})