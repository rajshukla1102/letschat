const io =require('socket.io')(8000)
console.log(`Connection setup on port 3000 `)
const users={}
io.on('connection',socket=>{
    socket.on("new-user-joined",name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message: message,name:users[socket.id]})
    });
    socket.on('disconnect',name=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
});