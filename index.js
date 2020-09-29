require('dotenv').config(); 

const express = require('express');
const bodyParser = require('body-parser');
const usersRoute = require('./routes/users')
const cardsRoute = require('./routes/cards');
const { connect } = require('mongoose');
const { signIn, createUser } = require('./controllers/auth');
const auth = require('./middlewares/auth');
const config = require('./config')

const app = express();

connect(config.mongo.url, {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')))


app.post('/signup', createUser);
app.post('/signin', signIn);

app.use(auth);

app.use(usersRoute);
app.use(cardsRoute);

app.get('*', (req, res)=>{
  res.status(404).send({message: 'Запрашиваемый ресурс не найден'});
});

app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).send({ message: err.message }); // Bad request
  }
  res.send({ message: err.message });  
});

app.listen(config.server.port, () => {
  console.log(`Magic happens on port ${config.server.port}`)
})

