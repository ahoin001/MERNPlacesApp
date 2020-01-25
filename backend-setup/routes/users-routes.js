const express = require('express')
const router = express.Router();
const usersControllers = require('../controller/users-controller')

router.get('/', usersControllers.listUsers)

// router.post('/signup', usersControllers.signUp)

// router.post('/login', usersControllers.login);

module.exports = router