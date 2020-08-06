// const { appendFile } = require("fs")

const socket=io('http://localhost:8000')
const form=document.getElementById('send-cont')
const messageInp=document.getElementById('messageInp')
var audio =new Audio('ping.mp3');
 


const messageContainer=document.querySelector('.container')

const append=(message,pos)=>{
    const documentCreate=document.createElement('div');
    documentCreate.innerText=message;
    documentCreate.classList.add('message')
    documentCreate.classList.add(pos)
    messageContainer.append(documentCreate);
    if(pos=='left'){
        audio.play();
    }
   

}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInp.value;
    append(`You: ${message}`,'right')
    socket.emit('send',message)
    messageInp.value='';
})

const name=prompt('Enter Your name')
socket.emit('new-user-joined',name);


socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')
})
socket.on('recieve',data=>{
    append(`${data.name}:${data.message}`,'left')
})
socket.on('left',name=>{
    append(`${name} left the chat`,'left')
})
   