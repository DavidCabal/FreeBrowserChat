export const initializeChat = (io): void => {
  io.on('connection', function (socket) {
    // do something fun when a user connects

    socket.on('disconnect', function(){
      // do something really sad when a user disconnects
    });

    socket.on('message', msg => {
      // when a message comes in on the "message" channel, emit it out to everyone that is connected
      socket.broadcast.emit('message', msg);
    });
  });
};