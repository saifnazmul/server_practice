const http = require('http');
const fs = require('fs');
const path = require('path');
const {get} = require('./router/get')
const {post} = require('./router/post')
const server = http.createServer((req,res)=>{

  if(req.method === "GET"){
    get(req,res)
   
  }else if (req.method === "POST" ){
    post(req,res)
  }
});


const PORT = 3006
server.listen(PORT,()=>{
  console.log(`server is running: http://localhost:${PORT}`)
})