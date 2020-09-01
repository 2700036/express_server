const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true,
  },
  avatar: {
    type: String,    
    required: true,
    validate: /^(http:\/\/|https:\/\/)(www.)?[-a-zA-Z0-9@:%._\/+~=]{1,256}#?$/,
    message: 'Cсылка неверного формата'
  } 
}, {
  versionKey: false 
})

module.exports = model('user', userSchema)