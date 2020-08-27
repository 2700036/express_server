const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '../data/users.json');

const sendUsers = (req, res) => {  
  fs.readFile(usersPath, {encoding: 'utf8'}, (err, data)=>{
    if(err){console.log(err);
      return
      }
      res.send(data)
  })  
};
const requestedUser = (users, id) => users.find(({_id}) => _id === id)

const doesUserExist = (req, res, next) => {
  const { id } = req.params;    
 
  fs.readFile(usersPath, {encoding: 'utf8'}, (err, data)=>{
    if(err){console.log(err);
      return
      }
      if (!requestedUser(JSON.parse(data), id)){
        res.status(404).send({ 'message': 'Нет пользователя с таким id' })
        return;
      }
      next();      
  })  
}

const sendUser = (req, res, next) => {
  const { id } = req.params;  
  fs.readFile(usersPath, {encoding: 'utf8'}, (err, data)=>{
      res.send(requestedUser(JSON.parse(data), id));
        
  })  
}

router.get('/users', sendUsers);
router.get('/users/:id', doesUserExist);
router.get('/users/:id', sendUser);

module.exports = router;