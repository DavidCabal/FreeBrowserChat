import express from 'express';

const app = module.exports = express();
const port = 3000;

require('./routes')(app);

app.listen({ port }, () => console.log(`Server listening on ${port} 🙌`));