
const path = require('path');
const fs   = require('fs');

function get(req,res){

  if(req.url === '/'){
    const filePath = path.join(__dirname,'../pages','home.html')
    fs.createReadStream(filePath).pipe(res)
  
  }else if(req.url === '/about'){
   res.end('about page')
  }else if (req.url.startsWith('/public/')){
    const CJ = path.join(__dirname,'..')
    fs.createReadStream(path.join(CJ,req.url)).pipe(res)
  }else{
    res.end('404 page')
  }
};

module.exports = {get}