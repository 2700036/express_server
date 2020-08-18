const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users')
const cardsRouter = require('./routes/cards')

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', usersRouter);
app.use('/', cardsRouter);

app.listen(PORT, ()=>{
  console.log();
  
})
