const fs = require("fs");
const path = require('path')
const http = require("http");

const server= http.createServer((req,res)=>{
  console.log(req.url)
  const readbleStream =fs.createReadStream(path.join(__dirname,'input.txt'))
  
  

  if(req.url === '/'){
    
    const writebleStream = fs.createWriteStream(path.join(__dirname,'out.txt'))
     //  simple away-----------------------------------------------------------------
     //  readbleStream.pipe(writebleStream);
     

    // full control------------------------------------------------------------
    const bufferArr = [];
     readbleStream.on ("data",(chunk)=>{
      console.log(chunk.toString())
      writebleStream.write(chunk)
     })
     readbleStream.on ("end",()=>{
      console.log("read end")
     });
     
     res.setHeader('Content-Type','text/html')
     return res.end('<h1>home page</h1>')

  }else if(req.url === '/details'){

    res.setHeader('Content-Type','text/html')
    res.write('<h1>this is details page</h1>')
    return res.end()
  }

  res.write('<h1>this is 404 page</h1>')
  res.end()
  
})

server.listen(3000,()=>{
  console.log("server running")
})