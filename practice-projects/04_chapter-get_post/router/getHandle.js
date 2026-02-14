const path = require('path')
const fs   = require('fs');
const crypto = require('crypto');
const {ROOT_DIR, PUBLIC_DIR} = require('../config/path')

function getHandle(req,res){
const dirRote = path.resolve(ROOT_DIR,'.'+req.url);
const ext = path.extname(req.url)

const MIME_type = {
  '.js':'application/javascript',
  '.css':'text/css',
};

const contentType = MIME_type[ext]
const staticFolders =['/js/','/css/'] 
  if(req.url === '/'){
    // console.log("home:",dirRote)
    res.writeHead(200,{'Content-Type':'text/html'});
    fs.createReadStream(path.join(ROOT_DIR,'pages','home.html'))
    .on('error',()=>{
      res.statusCode = 500;
      res.end('<h1>server error</h1>')
    })
    .pipe(res)
  }else if(req.url === '/loginForm'){
    res.writeHead(200,{'Content-Type':'text/html'});
     fs.createReadStream(path.join(ROOT_DIR,'pages','login.html'))
     .on('error',()=>{
        res.statusCode = 500;
        res.end('<h1>server error</h1>')
      })
     .pipe(res)
  }else if (staticFolders.some(f => req.url.startsWith(f))){
    const decodeUrl = decodeURIComponent(req.url) 
    const dirRote = path.resolve(PUBLIC_DIR,'.'+decodeUrl);
     console.log(dirRote)
    res.writeHead(200,{'Content-Type': contentType});
    fs.createReadStream(dirRote)
    .pipe(res)

  } else{
    res.statusCode = 404
    res.end('404 page')
  }
};

module.exports = getHandle