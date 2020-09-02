const Card = require('../models/card');

const doesCardExist = (card, res) => {
  card 
  ? res.send(card) 
  : res.status(404).send({ message: 'карточка не найдена' })
};

const handleCard = (card, res) => {
  card.then(card=>doesCardExist(card, res))
  .catch(err => {
    console.log(err.name)
    err.name == 'CastError' 
    ? res.status(500).send({ message: `Недопустимый формат id: ${err.message}`})
    : 0    
});
};

const getCards = (req, res) => {
  handleCard(Card.find({}).populate('user'), res); 
};

const createCard = (req, res)=>{
  const { _id } = req.user; //!
  const { name, link } = req.body;
  handleCard(Card.create({name, link, owner: _id}), res);
};

const deleteCard = (req, res)=>{
  const { id } = req.params;
  handleCard(Card.findByIdAndRemove(id), res);
};

const putLikeToCard = (req, res) => {
  const { _id } = req.user;
  const cardId = req.params.id;  
  handleCard(Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id }}, { new: true }), res);
};

const deleteLikefromCard = (req, res) => {
  const { _id } = req.user;
  const cardId = req.params.id;
  handleCard(Card.findByIdAndUpdate(cardId, { $pull: { likes: _id }}, { new: true }), res)
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  putLikeToCard,
  deleteLikefromCard
};