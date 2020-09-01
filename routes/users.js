const { getUser, getUsers, createUser } = require('../controllers/users');

const router = require('express').Router();




router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);

module.exports = router;