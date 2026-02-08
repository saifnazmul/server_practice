const msg = document.querySelector('#msg');
const formData = document.querySelector('#login');
console.log(msg)

formData.addEventListener('submit',(e)=>{
  e.preventDefault()
  const formData = new FormData (e.target)
  // console.log(formData.getAll())

  const fd =[];
  for (const [key,value] of formData) {
    fd.push({[key]:value})
  }

console.log(fd)
fetch('/login',{
  method:'POST',
  body:JSON.stringify(fd)
})
.then((res)=> res.json())
.then(data => {
  console.log(data.data);
  alert(data.messege);
  msg.innerText = `${data.messege}`
})


})







