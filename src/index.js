const express = require('express');

const talkerRouter = require('./routes/talker');

const loginRouter = require('./routes/login');

const app = express();
app.use(express.json());

app.use('/talker', talkerRouter);

app.use('/login', loginRouter);

const HTTP_OK_STATUS = 200;
const PORT = '3001';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
