const http = require("http");

const server= http.createServer((req,res)=>{
  console.log(req.url , req.headers,req.method)

  res.write('<h1>first sever text</h1>')
  res.end()
  
})

server.listen(3000,()=>{
  console.log("server running")
})