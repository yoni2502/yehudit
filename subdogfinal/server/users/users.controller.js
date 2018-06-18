const express = require('express');
const router = express.Router();
const usersService = require('./users.service');

router.get('/:userId', usersService.getUser);

router.post('/', usersService.createUser);

router.put('/:userId', usersService.updateUser);

router.delete('/:userId', usersService.deleteUser);

module.exports = router;