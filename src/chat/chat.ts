const sendMessage = (socket): void => {
  const message = (<HTMLInputElement>document.getElementById('m')).value;
  if (!isCommand(message)) {
    socket.emit('message', `${myName}: ${message}`);
    appendMyMessage(message);
  } else {
    socket.emit('sendGif', '');
  }
  (<HTMLInputElement>document.getElementById('m')).value = '';
};

const receiveMessages = (socket): void => {
  socket.on('message', msg => {
    appendOtherMessage(msg);
  });

  socket.on('gif', url => {
    document.getElementById('gif').style.display = 'inline-block';
    (<HTMLImageElement>document.getElementById('gif')).src = `https://giphy.com/embed/${url}`;
    setTimeout(() => document.getElementById('gif').style.display = 'none', 5000);
  });
};

const appendMyMessage = (msg: string): void => {
  const msgElement = document.createTextNode(`${myName}: ${msg}`);
  const li = document.createElement('li');
  li.setAttribute('class', 'mine');
  li.appendChild(msgElement);
  messageList.appendChild(li);
  messageList.scrollTop = messageList.scrollHeight;
};

const appendOtherMessage = (msg: string): void => {
  const msgElement = document.createTextNode(msg);
  const li = document.createElement('li');
  li.setAttribute('class', 'theirs');
  li.appendChild(msgElement);
  messageList.appendChild(li);
  messageList.scrollTop = messageList.scrollHeight;
};

const isCommand = (msg: string): boolean => msg === '/gif';

const messageList = document.getElementById('messages');

const randomUserName: string = 'user' + Math.floor(Math.random() * (10000 - 1000) + 1000);

const myName: string = window.prompt('Enter your name', randomUserName) || randomUserName;

const detectKeyPress = (key, socket): void => {
  if (key.keyCode && key.keyCode === 13) {
    sendMessage(socket);
  }
}