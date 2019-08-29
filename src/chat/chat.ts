const app = require('../index');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

export const initializeChat = (req, res) => {
  io.on('connection', function (socket) {
    console.log('a user connected');
  });

  console.log('chatting now');
  res.sendFile(__dirname + '/chat.html');
};