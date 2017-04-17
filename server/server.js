// https://vast-headland-62602.herokuapp.com/
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {genMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8080;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); // for events!

io.on('connection',(socket) => {
  console.log('New user connected');

  socket.emit('newMessage',
  genMessage("Admin", "Welcome to the chat app!"));


  socket.broadcast.emit('newMessage',
  genMessage("Admin", "New user joined"));

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
