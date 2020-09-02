const router = require('express').Router();
const { getCards, createCard, deleteCard, putLikeToCard, deleteLikefromCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:id', deleteCard);
router.put('/cards/likes/:id', putLikeToCard);
router.delete('/cards/likes/:id', deleteLikefromCard);

module.exports = router;