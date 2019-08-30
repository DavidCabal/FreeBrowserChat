
module.exports = (app) => {

  app.get('/', (req, res) => res.send('we did it'));

  app.get('/chat', (req, res) => res.sendFile(__dirname + '/chat/chat.html'));

}