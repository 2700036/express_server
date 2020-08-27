const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const usersRoute = require('./routes/users')
const cardsRoute = require('./routes/cards')

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', usersRoute);
app.use('/', cardsRoute);

app.listen(PORT, ()=>{
  console.log(`server running on PORT ${PORT}`);
  
})

