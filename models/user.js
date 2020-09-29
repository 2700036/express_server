const { Schema, model } = require("mongoose");
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 20,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 20,
  },
  avatar: {
    type: String,
    validate: {
      validator: v=> {
          return /^(http:\/\/|https:\/\/)(www.)?[-a-zA-Z0-9@:%._\/+~=]{1,256}#?$/.test(v)
      },    
    message: 'Cсылка неверного формата'
    }
  } 
}, {
  versionKey: false 
});

//кастомная ошика для дубликатов почты
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Пользователь с такой почтой уже зарегистрирован'));
  } else {
    next();
  }
});

userSchema.statics.findUserByCredentials = function (email, password){  
  return this.findOne({email})
  .then(user=>{
    if(!user){
      return Promise.reject(new Error('Неправильные почта или пароль'))
    }
    return bcrypt.compare(password, user.password)
    .then(matched=>{
      if(!matched){
        return Promise.reject(new Error('Неправильные почта или пароль'))
      }
      return user;
    });
  })
 
}


module.exports = model('user', userSchema)