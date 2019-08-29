const sendMessage = (socket): void => {
  const message = (<HTMLInputElement>document.getElementById('m')).value;
  socket.emit('message', `${myName}: ${message}`);
  (<HTMLInputElement>document.getElementById('m')).value = '';
  appendMyMessage(message);
};

const receiveMessages = (socket): void => {
  socket.on('message', msg => {
    appendOtherMessage(msg);
  });
};

const appendMyMessage = (msg: string): void => {
  const msgElement = document.createTextNode(`${myName}: ${msg}`);
  const li = document.createElement('li');
  li.setAttribute('class', 'mine');
  li.appendChild(msgElement);
  messageList.appendChild(li);
};

const appendOtherMessage = (msg: string): void => {
  const msgElement = document.createTextNode(msg);
  const li = document.createElement('li');
  li.setAttribute('class', 'theirs');
  li.appendChild(msgElement);
  messageList.appendChild(li);
};

const messageList = document.getElementById('messages');

const randomUserName = 'user' + Math.floor(Math.random() * (10000 - 1000) + 1000);

const myName = window.prompt('Enter your name', randomUserName) || randomUserName;

const detectKeyPress = (key, socket) => {
  if (key.keyCode && key.keyCode === 13) {
    sendMessage(socket);
  }
}