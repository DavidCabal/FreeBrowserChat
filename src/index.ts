import express from 'express';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 3000;

app.use('/static', express.static(__dirname + '/chat'));

require('./chat/setup').initializeChat(io);

require('./routes')(app);

server.listen({ port }, () => console.log(`Server listening on ${port} 🙌`));