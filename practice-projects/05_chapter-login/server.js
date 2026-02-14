
const http = require('http');
const path = require('path')



const getHandle = require('./router/getHandle');
const postHandle = require('./router/postHandle');
const {ROOT_DIR} = require('./config/path')

const server = http.createServer((req,res)=>{

  if(req.method === 'GET'){
    getHandle(req,res)
  }else if(req.method=== 'POST'){
    postHandle(req,res)
  }
});


const PORT = 3005 ;
server.listen(PORT,()=>{
  console.log(`server is running: http://localhost:${PORT}`);
})

