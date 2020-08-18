const router = require('express').Router();
const fs = require('fs');
const path = require('path')
const usersPath = path.join(__dirname, '../data/users.json');

router.get('/users', (req, res) => {  
  fs.readFile(usersPath, {encoding: 'utf8'}, (err, data)=>{
    if(err){console.log(err);
      return
      }
      res.send(data)
  })
  
})

router.get('/users/:id', (req, res) => {
  const { id } = req.params;  
  const requestedUser = (users) => users.find(({_id}) => _id === id)
 
  fs.readFile(usersPath, {encoding: 'utf8'}, (err, data)=>{
    if(err){console.log(err);
      return
      }
      if (!requestedUser(JSON.parse(data))){
        res.statusCode = 404;
        res.send({ 'message': 'Нет пользователя с таким id' })
        return;
      }
      res.send(requestedUser(JSON.parse(data)))
  })
  
})

module.exports = router;