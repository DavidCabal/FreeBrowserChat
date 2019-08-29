import { initializeChat } from './chat/chat';

module.exports = (app) => {

  app.get('/', (req, res) => res.send('we did it'));

  app.get('/chat', initializeChat);

}