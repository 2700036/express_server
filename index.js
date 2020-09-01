const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const usersRoute = require('./routes/users')
const cardsRoute = require('./routes/cards');
const { connect } = require('mongoose');


const { PORT = 3000 } = process.env;

const app = express();

connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, 'public')))

//? Времяночка
app.use((req, res, next) => {
  req.user = {
    _id: '5f4e7374194bc35bd42722e4'
  };
  next();
});

app.use('/', usersRoute);
app.use('/', cardsRoute);

app.listen(PORT, ()=>{
  console.log(`server running on PORT ${PORT}`);
  
})

