var {Server} = require("socket.io");
const express = require('express');
const http = require('http');
const cors = require('cors');


const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server,{cors:{
    origin:"http://localhost:5173"
}});

io.on("connection", (socket)=>{
    socket.on("join", (data) => {
        socket.emit("new_user",{"username":data.username,"id":socket.id});
    });

    socket.on("mousemove", (data) => {
        console.log(data);
        socket.emit("user_moves_mouse",data);
    });
})




const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {});