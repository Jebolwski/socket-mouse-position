const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const robot = require('robotjs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static('pages'));

io.on('connection', (socket) => {
  console.log(socket.id,'idli bir kullanici bağlandi.');

  socket.on('user_moves_mouse', (data) => {
    console.log(socket.id,"idli kullanicinin mouse hareketi:","X :",data.x,"Y :",data.y);
    socket.broadcast.emit("user_moves_mouse",{"mouse":data,"id":socket.id});
  });

  socket.on('key_up', (keyCode) => {
    console.log(socket.id,"idli kullanici (",keyCode,") tuşunu birakti.");
    socket.broadcast.emit("key_up",{"key":keyCode,"id":socket.id});
  });

  socket.on('disconnect', () => {
    console.log(socket.id,'idli kullanici ayrıldı.');
  });
});

  
  

server.listen(PORT, () => {});
