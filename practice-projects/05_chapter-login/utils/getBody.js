const crypto = require('crypto')

const getBody = (req)=>{
  return new Promise((resolve, reject) => {

      
  const body =[]
   req
   .on('data',(chunk)=>{
     body.push(chunk)
   })
   .on('end',()=>{
    try {
      // console.log(req)
      const {username,password,email} = JSON.parse(body.toString()) || "{}";
      
      const passEncrypt = crypto.createHmac('sha256',"codemy");
      passEncrypt.update(password);
      const hashPas = passEncrypt.digest('hex');
      console.log(hashPas);
      
      resolve({
        username:username,
        password:hashPas,
        email:email
         
      })  
            
    } catch (error) {
      reject('invail json')
    };

   })



  })

};

module.exports = getBody;