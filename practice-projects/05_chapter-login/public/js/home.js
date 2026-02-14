const msg = document.querySelector('#msg');
const formData = document.querySelector('#login');
console.log(msg)

formData.addEventListener('submit',(e)=>{
  e.preventDefault()
  const formData = new FormData (e.target)
  // console.log(formData.getAll())

  let fd = {};
  for (const [key,value] of formData) {
    fd[key]=value
  }

console.log(fd)
fetch('/login/submit',{
  method:'POST',
  body:JSON.stringify(fd)
})
.then((res)=> res.json())
.then(data => {
  const da = data.user
  console.log(da);
  alert(data.message);
  msg.innerText = `${data.message}`
})


})

  




