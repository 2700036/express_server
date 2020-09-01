const User = require('../models/user');

const getUsers = (req, res) => {  
  User.find({})
  .then(users => res.send(users))
    .catch(err => res.status(500).send({ message: err.message }));
};

// const requestedUser = (users, id) => users.find(({_id}) => _id === id)

// const doesUserExist = (req, res, next) => {
//   const { id } = req.params;    
 
//   fs.readFile(usersPath, {encoding: 'utf8'}, (err, data)=>{
//     if(err){console.log(err);
//       return
//       }
//       if (!requestedUser(JSON.parse(data), id)){
//         res.status(404).send({ 'message': 'Нет пользователя с таким id' })
//         return;
//       }
//       next();      
//   })  
// }

const getUser = (req, res) => {
  const { id } = req.params;   
  User.findById(id).then(user => {
    user 
    ? res.send(user) 
    : res.status(404).send({ message: 'пользователь не найден' })
  })
    .catch(err => res.status(500).send({ message: err.message }));
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;  
  User.create({ name, about, avatar })
  .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: err.message }));
}

module.exports = {
  getUsers,
  getUser,
  createUser
}