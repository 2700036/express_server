const { Schema, model } = require("mongoose");

const cardSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: /^(http:\/\/|https:\/\/)(www.)?[-a-zA-Z0-9@:%._\/+~=]{1,256}#?$/,
    message: "Cсылка неверного формата",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}, {
  versionKey: false 
});

module.exports = model("card", cardSchema);
