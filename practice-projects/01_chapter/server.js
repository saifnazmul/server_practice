const http = require('http');
const fs = require('fs')
const path = require('path');

const server = http.createServer((req,res)=>{
  console.log(req.url)
  console.log('base:',path.basename(req.url))

  if(req.url === "/"){
   const home =  path.join(__dirname,'pages','home.html')
   res.setHeader('Content-Type','text/html');
    fs.createReadStream(home)
    .on('error',()=>{
      res.statusCode = 500
      res.end('server err')
    })
    .pipe(res);

  }else if(req.url.endsWith('.js')){
    const pathjs = path.join(__dirname,'public',path.basename(req.url))
      res.setHeader('Content-Type','application/javascript');

      fs.createReadStream(pathjs)
      .on('error',()=>{
        res.statusCode = 404
        res.end('file not found')
      })
      .pipe(res)
  }else if(req.url.endsWith('.css')){


      const pathcss = path.join(__dirname,'public',path.basename(req.url))
    res.setHeader('Content-Type','text/css');
    fs.createReadStream(pathcss)
    .on('error',()=>{
      res.statusCode = 404
      res.end('file not found')
    })
    .pipe(res)

  }else{
    res.statusCode = 404
    res.end('404 page')
  }

});



server.listen(4000,()=>{
  console.log(`running sever: http://localhost:${4000}`)
})