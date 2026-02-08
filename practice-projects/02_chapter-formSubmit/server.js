const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto')


const server = http.createServer((req,res)=>{
  const extname= path.extname(req.url)
  const CJ = path.join(__dirname,'public',path.basename(req.url))
 

const MIME_TYPE = {
  '.html':'text/html',
  '.css':'text/css',
  '.js':'application/javascript'
}

  console.log(req.url)
if(req.url === '/'){
  const filePath = path.join(__dirname,'pages','home.html')
  fs.createReadStream(filePath).pipe(res)

}else if (req.url === '/login' && req.method === 'POST'){
   const fileWrite = fs.createWriteStream(path.join(__dirname,'login.txt'))
   req.pipe(fileWrite)
   res.writeHead(302,{location:'/'});
   res.end()
}else if (req.url.endsWith('.js')){

  console.log("base",extname)
  res.setHeader('Content-Type',MIME_TYPE[extname])
  fs.createReadStream(CJ).pipe(res)

}else if (req.url.endsWith('.css')){

  console.log("base",extname)
  res.setHeader('Content-Type',MIME_TYPE[extname])
  fs.createReadStream(CJ).pipe(res)

} else{
  res.statusCode = 404
   res.end('404 page')
}


});

const PORT = 3004
server.listen(PORT,()=>{
  console.log(`server is running: http://localhost:${PORT}`)
})