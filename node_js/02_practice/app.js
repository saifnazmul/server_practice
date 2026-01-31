const http = require("http");

const server= http.createServer((req,res)=>{
  console.log(req.url , req.headers,req.method)

  if(req.url === '/'){
    res.setHeader('Content-Type','text/html')
    res.write('<h1>this is home page</h1>')
    return res.end()
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