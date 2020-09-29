const User = require('../models/user');

const options = {
  new: true, // обработчик then получит на вход обновлённую запись
  runValidators: true, // данные будут валидированы перед изменением
  // upsert: true // если пользователь не найден, он будет создан
};

const doesUserExist = (user, res) => {
  return user 
  ? res.send(user) 
  : res.status(404).send({ message: 'пользователь не найден' })
};

const handleUser = (user, res) => {
  return user.then(user=>doesUserExist(user, res))
  .catch(err => {
    console.log(err)
    res.status(500).send({ message: err.message })});
};

const getUsers = (req, res) => { 
  let skipBy = 0;
  let limitBy = 0; 
  if(req.query.limit)limitBy = parseInt(req.query.limit);
  if(req.query.skip)skipBy = parseInt(req.query.skip);    
  handleUser(User.find({}).skip(skipBy).limit(limitBy), res);  
};

const getUser = (req, res) => {
  const { id } = req.params;   
  handleUser(User.findById(id), res);
};

const updateUser = (req, res) => {
  const { _id } = req.user;  
  const { name, about } = req.body;
  handleUser(User.findByIdAndUpdate(_id, {name, about}, options), res)  
};

const updateUserAvatar = (req, res) => {
  const { _id } = req.user;  
  const { avatar } = req.body;
  handleUser(User.findByIdAndUpdate(_id, {avatar}, options), res)  
};

module.exports = {
  getUsers,
  getUser,  
  updateUser,
  updateUserAvatar,  
}
  
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