const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createUser = (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10)
  .then(hash=>{    
    User.create({ email, password: hash })
    .then(user=>{
      res.send(user)
    })
    .catch(err =>{
      res.status(500).send({ message: err.message }) 
    })
  })  
     
};

const signIn = (req, res) => {  
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
  .then(user=>{
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.send({ token }); 
  })
  .catch(err=>{
    res.status(401).send({message: err.message})
  })

}

module.exports = {
  createUser,
  signIn
}


