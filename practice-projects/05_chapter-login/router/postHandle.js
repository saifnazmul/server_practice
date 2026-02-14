
const path = require('path')
const fs   = require('fs');
const crypto = require('crypto');
const resDB = require('../repositories/user.repo');
const getBody = require('../utils/getBody');

async function postHandle(req,res){
  if(req.url === '/login/submit'){
     const data = await getBody(req);
     const result = await resDB.insertUser(data)
     console.log(result)
      
      res.end(JSON.stringify({
        message:'successful',
        user:{name:data.username,email:data.email}
      }))
  }else{
    res.statusCode = 404
    res.end('404 page')
  }
};

module.exports = postHandle