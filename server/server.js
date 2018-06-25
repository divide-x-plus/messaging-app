const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const public_path = path.join(__dirname, '../public');
const port = process.env.PORT || 3000
var app = express();
// createServer takes a function with (req, res) arguments
var server = http.createServer(app);
// instantiate a web socket server
var io = socketIO(server);



app.use(express.static(public_path));

// register an event listener to a web socket
io.on('connection', (socket) => {
  console.log('A new user is connected');

  socket.on('disconnect', () => {
    console.log('server is disconnected')
  })
})

server.listen(port, () => {
  console.log(`server is up on ${port}`);
});
