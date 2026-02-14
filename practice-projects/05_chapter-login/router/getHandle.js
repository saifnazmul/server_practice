const path = require('path')
const fs   = require('fs');
const {access} = require('fs/promises')
const crypto = require('crypto');
const eventEmitter = require('events');
const {ROOT_DIR, PUBLIC_DIR} = require('../config/path')
const pool = require('../db/db')



async function getHandle(req,res){
const ext = path.extname(req.url);
const [rows] = await pool.query('SELECT * FROM life_quotes')
// console.log(rows[1])

const emitter = new eventEmitter ()
emitter.on('getmsg',(name)=>{
  console.log(name)
})


const MIME_type = {
  '.js':'application/javascript',
  '.css':'text/css',
};
const contentType = MIME_type[ext];
const staticFolders =['/js/','/css/'];

  if(req.url === '/'){
    // console.log("home:",dirRote)
      
   async function checkFile(){


    try {
      await access(path.join(__dirname,'pass.text'))
      console.log("file exists")
    } catch{
      console.log('file not')
    }
   };

   checkFile()

    res.writeHead(200,{'Content-Type':'text/html'});
    fs.createReadStream(path.join(ROOT_DIR,'pages','home.html'))
    .on('error',()=>{
      res.statusCode = 500;
      res.end('<h1>server error</h1>')
    })
    .pipe(res)
  }else if(req.url === '/loginForm'){
     
    
    emitter.emit('getmsg','saif')
    

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