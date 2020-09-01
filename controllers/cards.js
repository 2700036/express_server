const Card = require('../models/card');


const getCards = (req, res) => {
  Card.find({})
  .populate('user')
  .then(cards => res.send({ data: cards }))
  .catch(err => res.status(500).send({ message: err.message }));
}

const createCard = (req, res)=>{
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({name, link, owner: _id})
  .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: err.message }));
}

const deleteCard = (req, res)=>{
  const { id } = req.params;
  Card.findByIdAndRemove(id)
  .then(card => {
    card
    ? res.send(card) 
    : res.status(404).send({ message: 'карточка не найдена' }); 
  })
    .catch(err => res.status(500).send({ message: err.message }));
}

module.exports = {
  getCards,
  deleteCard,
  createCard
}
