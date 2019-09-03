const nodeFetch = require('node-fetch');

export const initializeChat = (io): void => {
  io.on('connection', socket => {
    // do something fun when a user connects

    socket.on('disconnect', (client) => {
      currentUsers = currentUsers.filter(user => user.id !== socket.id);
      io.emit('userDisconnected', socket.id);
    });

    socket.on('initialConnection', () => {
      io.to(`${socket.id}`).emit('currentUsers', currentUsers);
    });

    socket.on('userConnected', user => {
      currentUsers.push(user);
      io.emit('userConnected', user);
    });

    socket.on('message', msg => {
      io.emit('message', msg);
    });

    socket.on('sendGif', async () => {
      const gifUrl = await getRandomGif();
      io.emit('gif', JSON.stringify(gifUrl));
    });
  });
};

let currentUsers = [];

const getRandomGif = async () => {
  const response = await nodeFetch('https://api.giphy.com/v1/gifs/random?api_key=iy4oHQZmxRq8KH1x6S2yeeWIyh54ahGY&tag=fail&rating=G');
  const gifObject = await response.json();
  return {
    url: gifObject.data.images.downsized_medium.url,
    height: gifObject.data.images.downsized_medium.height,
    width: gifObject.data.images.downsized_medium.width
  };
};