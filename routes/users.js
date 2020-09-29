const { getUser, getUsers, updateUser, updateUserAvatar} = require('../controllers/users');

const router = require('express').Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;