const db = require('../db/db');

exports.insertUser =async (user)=>{
  try {
    const [result] = await db.query('INSERT INTO loginForm (name,password,email) VALUES(?,?,?)',[user.username,user.password,user.email])
    console.log(result)
  return result;
  } catch (error) {
   console.log("server insert error",error)
}
} 