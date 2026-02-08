
function post (req,res){
  if(req.url === '/login'){
    let body = ''
    req
    .on('data',(chunk)=>{
      body += chunk
    })
    .on('end',()=>{
      res.end(JSON.stringify({
        messege:"login successful",
        data: JSON.parse(body)
      }))
    })
  }
};

module.exports = {post}